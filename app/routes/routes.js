module.exports = (app) => {
    const App = require("../controllers/controller.js");
    //this describes the usuable routes for our front end    
    app.post("/api/postUser", App.create);
  
    app.get("/api/getAllUsers", App.findAll);
};