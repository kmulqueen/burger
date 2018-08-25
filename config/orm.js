// Require connection.js
const connection = require("./connection.js");

// Create function to handle number of question marks
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Create object for all SQL statement functions
const orm = {
    selectAll: function (tableInput, cbFunc) {
        var queryString = `SELECT * FROM ${tableInput};`;
        connection.query(queryString, function (err, results) {
            if (err) {
                throw err;
            }
            cbFunc(results);
        });
    },
    insertOne: function (table, cols, vals, cbFunc) {
        var queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function (err, results) {
            if (err) {
                throw err;
            }
            cbFunc(results);
        });
    },
    updateOne: function (table, objColVals, condition, cbFunc) {
        var queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, function(err, results) {
            if (err) {
                throw err;
            }
            cbFunc(results);
        });
    }
};

module.exports = orm;