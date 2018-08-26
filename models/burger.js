const orm = require("../config/orm.js");

const burger = {
    all: function(cb) {
        orm.selectAll("burgers", function(res) {
            console.log("burger.all results", res);
            cb(res);
         
        });
    },
    insert: function(cols, vals, cb) {
        orm.insertOne("burgers", cols, vals, function(res) {
            console.log("burger.insertOne results", res);
            cb(res);
        });
    },
    update: function(objColVals, condition, cb) {
        orm.updateOne("burgers", objColVals, condition, function(res) {
            console.log("burger.updateOne results", res);
            cb(res);
        });
    }
};

module.exports = burger;