// I used a resource to setup this database connection.
// here is the link: https://www.codementor.io/olawalealadeusi896/building-a-simple-api-with-nodejs-expressjs-postgresql-db-and-jwt-3-mke10c5c5


const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

let databaseUrl = '';

if (process.env.NODE_ENV === 'production') {
  databaseUrl = process.env.DATABASE_URL;
} else if (process.env.NODE_ENV === 'test') {
  databaseUrl = process.env.TEST_DATABASE_URL;
} else {
  databaseUrl = process.env.DEV_DATABASE_URL;
}


const pool = new Pool({
  connectionString: databaseUrl,
});

pool.on('connect', () => {
  console.log('connected to the database');
});

/**
 * Create User Table in the database
 */
const createUserTable = () => {
  const tableData = `CREATE TABLE IF NOT EXISTS
  users(
    id serial NOT NULL PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    firstName VARCHAR NOT NULL,
    lastName VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    isAdmin BOOLEAN
  )`;

  pool.query(tableData)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((error) => {
      console.log(error);
      pool.end();
      return error;
    });
};

/**
 * Create Account Table in the database
 */
const createAccountTable = () => {
  const tableData = `CREATE TABLE IF NOT EXISTS
  accounts(
    id serial NOT NULL PRIMARY KEY,
    accountNumber BIGINT NOT NULL UNIQUE,
    createdOn TIMESTAMP NOT NULL,
    owneremail VARCHAR NOT NULL,
    type TEXT NOT NULL,
    status TEXT NOT NULL,
    balance FLOAT NOT NULL
  )`;

  pool.query(tableData)
    .then((res) => {
      console.log(res);
      
      pool.end();
    })
    .catch((error) => {
      console.log(error);
      pool.end();
    });
};

/**
 * Create Transactions Table in the database
 */
const createTransactionTable = () => {
  const tableData = `CREATE TABLE IF NOT EXISTS
  transactions(
    id serial NOT NULL PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL,
    type TEXT NOT NULL,
    accountNumber BIGINT NOT NULL,
    cashier serial NOT NULL,
    amount BIGINT NOT NULL,
    oldBalance FLOAT NOT NULL,
    newBalance FLOAT NOT NULL
  )`;

  pool.query(tableData)
    .then((res) => { 
      console.log(res);
      pool.end();
    })
    .catch((error) => {
      console.log(error);
      pool.end();
    });
};

/**
  * Drop user Tables
*/

const dropUserTable = () => {
  const tableData = 'DROP TABLE IF EXISTS users returning *';
  pool.query(tableData)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((error) => {
      console.log(error);
      pool.end();
    });
};

/**
  * Drop Account Tables
*/

const dropAccountTable = () => {
  const tableData = 'DROP TABLE IF EXISTS accounts returning *';
  pool.query(tableData)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((error) => {
      console.log(error);
      pool.end();
    });
};

/**
  * Drop Transaction Tables
*/

const dropTransactionTable = () => {
  const tableData = 'DROP TABLE IF EXISTS transactions returning *';
  pool.query(tableData)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((error) => {
      console.log(error);
      pool.end();
    });
};


/**
   * Create All tables
*/

const createAllTables = () => {
  createUserTable();
  createAccountTable();
  createTransactionTable();
};

/**
 * Drop All tables
 */
const dropAllTables = () => {
  dropUserTable();
  dropAccountTable();
  dropTransactionTable();
};

pool.on('remove', () => {
  console.log('tables removed');
  process.exit(0);
});

module.exports = {
  createUserTable,
  createAccountTable,
  createTransactionTable,
  createAllTables,
  dropUserTable,
  dropAccountTable,
  dropTransactionTable,
  dropAllTables,
};

require('make-runnable');
