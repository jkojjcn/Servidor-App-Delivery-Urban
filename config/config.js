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
  'host': 'ec2-3-92-151-217.compute-1.amazonaws.com',
  'port': 5432,
  'database': 'daun12out4i4ae',
  'user' : 'uqhulomldbdaia',
  'password': '67697725a8baa94ae8c32acc9cddf906ffd5b0f6426aec0d7d53a57c21bd73eb',
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    },
  },
};
/*
const databaseConfig = {
    'host': 'ec2-54-173-77-184.compute-1.amazonaws.com',
    'port': 5432,
    'database': 'ddgao5ktk98466',
    'user' : 'vdwxhefhjxviyo',
    'password': '5a069f4437414d7a01e6902ee24cddec72734ef91fc6fcea40bea15513ffec8b',
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false
      },
    },
};
let cloud_config = {
    username: 'vtkdjenwmtvbpi',
    database: 'dfp23mevs3oe30',
    password: '09d15179e8b1bd2dac178feb0bdcdc40a6ac65ecf5f39e3e27c710dc31a57f4e',
    host: 'ec2-54-146-84-101.compute-1.amazonaws.com',
    port: 5432,
    ssl: false,
    strictSSL: false,
    dialect: 'postgres',
    
  };*/


const db = pgp(databaseConfig);

module.exports = db;