module.exports = (app) => {
    const App = require("../controllers/controller.js");
    
    app.post("/api/postUser", App.create);
  
    app.get("/api/getAllUsers", App.findAll);
};