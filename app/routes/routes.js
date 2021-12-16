module.exports = (app) => {
    const App = require("../controllers/controller.js");
    
    app.post("/create", App.create);
  
    app.get("/get-all", App.findAll);
};