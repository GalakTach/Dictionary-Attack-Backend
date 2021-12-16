const router = require('express').Router();
const {body} = require('express-validator');
var cors = require('cors');
const { validateWord } = require('./controllers/dictionaryControllers/validateWord');
router.use(cors());

router.get('/ping',(req,res)=> {
    res.json({message: "Hello from server"});
})



module.exports=router;