const promise = require('bluebird');
const options = {
    promiseLib: promise,
    query: (e) => {}
}

const pgp = require('pg-promise')(options);
const types = pgp.pg.types;
types.setTypeParser(1114, function(stringValue) {
    return stringValue;
});

const databaseConfig = {
    'host': 'postgres://vtkdjenwmtvbpi:09d15179e8b1bd2dac178feb0bdcdc40a6ac65ecf5f39e3e27c710dc31a57f4e@ec2-54-146-84-101.compute-1.amazonaws.com:5432/dfp23mevs3oe30',
    'port': 5432,
    'database': 'dfp23mevs3oe30',
    'user' : 'vtkdjenwmtvbpi',
    'password': '09d15179e8b1bd2dac178feb0bdcdc40a6ac65ecf5f39e3e27c710dc31a57f4e'
};


const db = pgp(databaseConfig);

module.exports = db;