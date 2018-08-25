// Require connection.js
const connection = require("./connection.js");

// Create function to handle number of question marks
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
};

function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
};

// Create object for all SQL statement functions
const orm = {
    selectAll: function (table, cbFunc) {
        var queryString = "SELECT * FROM " + table;
        console.log("Query: " + queryString);
        connection.query(queryString, function (err, results) {
            if (err) {
                throw err;
            }
            cbFunc(results);
            console.log("cbFuncORM RAN")
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

        connection.query(queryString, function (err, results) {
            if (err) {
                throw err;
            }
            cbFunc(results);
        });
    }
};

module.exports = orm;