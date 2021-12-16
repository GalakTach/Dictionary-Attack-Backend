const App = require("../models/model.js");

exports.findAll = (req,res) => {
    App.find()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the Message.",
              });
        });
};

exports.create = (req,res) => {
    const user = new App({
        username: req.body.username,
        highscore: req.body.highscore,
        time: req.body.time
    });
    user.save().then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Message.",
          });
    })
}
