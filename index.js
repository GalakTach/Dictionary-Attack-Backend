const express = require("express");
const axios = require("axios");

const app = express();
const http = require("https");
const cors = require("cors");
const corsOptions ={
  origin:['http://localhost:3000','https://dictionary-attack.netlify.app'], 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
  
}
//body parser allows us to parse the body of the response from the frontend
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // body-parser
app.use(bodyParser.json()); // body-parser
require('dotenv').config()

const mongoose = require("mongoose");
app.use(cors(corsOptions));

require('./app/routes/routes.js')(app);
//This function allows our application to listen on the given port and host
const port = process.env.PORT || 5000;
app.listen(port, function(){
  console.log(`App listening on port ${port}`);
  console.log('Press Ctrl+C to quit.');
});
  
app.get( '/', (req,res) => {
  res.json({message:"Hello from server"});
})

//this section of code allows us to connect to our Mongo Database
//this is for a new version
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
}).then(()=> {
  console.log("successfully connected to the database");
}).catch((err)=> {
    console.log("Could not connect to the database. Error...", err);
    process.exit();
})

//this is the method used to validate the word through the Oxford API
app.get("/api/validateWord/:word", (req, res) => {
    getDefinition(req.params.word, res)
})

//This method calls the oxford api and validates the words. The response returned has the word and definition
function getDefinition(word, this_response){
    const options = {
        host: "od-api.oxforddictionaries.com",
        port: "443",
        path: "/api/v2/entries/en-us/" + word,
        method: "GET",
        headers: {
            'app_id': process.env.OXFORD_DICT_API_ID,
            'app_key': process.env.OXFORD_DICT_API_KEY
        }
    }
    let body = "";
    let parsed={};
    let wordFound = true;
    http.get(options, (res) => {
        res.on("data", (d) => {
          body += d;
        });

        res.on("end", () => {
          body = JSON.parse(body)
          try {
  
            if(body.error){
              wordFound = false;
              throw new Error('no results found')
             
            }
              
  
            parsed.id = body.id;
            parsed.word = body.word;
            parsed.definitions = [];
            
  
            const {results} = body;
  
            if(results)
              for(let i=0; i<results.length; i++) {
                if(results[i].lexicalEntries)
                  for(let j=0; j<results[i].lexicalEntries.length; j++) {
                    if(results[i].lexicalEntries[j].entries)
                      for(let k=0; k<results[i].lexicalEntries[j].entries.length; k++) {
                        if(results[i].lexicalEntries[j].entries[k].pronunciations)
                          if(results[i].lexicalEntries[j].entries[k].senses)
                            for(let l=0; l<results[i].lexicalEntries[j].entries[k].senses.length; l++) {
                              let sense = {};
                              try{sense.definition = results[i].lexicalEntries[j].entries[k].senses[l].definitions[0]}catch(e){console.log('Definition: ', e.message)}
                              parsed.definitions.push(sense);
                            
                            }
                      }
                  }
              }
          }
          catch (e) {
            console.log('Overall: ', e.message);
            parsed.error = body.error;
          }
          var firstDef = (wordFound) ? parsed.definitions[0] : "" ;
          console.log(firstDef);
          parsed.definitions = firstDef;
          this_response.json(parsed);
          
        });
      });
}