const debug = require('debug');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
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

  return pool.query(tableData)
    .then((res) => {
      pool.end();
      return res;
    })
    .catch((error) => {
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
    owner serial NOT NULL,
    type TEXT NOT NULL,
    status TEXT NOT NULL,
    balance FLOAT NOT NULL,
    FOREIGN KEY (owner) REFERENCES users (id)
  )`;

  return pool.query(tableData)
    .then((res) => {
      pool.end();
      return res;
    })
    .catch((error) => {
      pool.end();
      return error;
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
    newBalance FLOAT NOT NULL,
    FOREIGN KEY (cashier) REFERENCES users (id)
  )`;


  return pool.query(tableData)
    .then((res) => { 
      pool.end();
      return res;
    })
    .catch((error) => {
      pool.end();
      return error;
    });
};

/**
  * Drop user Tables
*/

const dropUserTables = () => {
  const tableData = 'DROP TABLE IF EXISTS users returning *';
  pool.query(tableData)
    .then((res) => {
      debug('db')(res);
      pool.end();
    })
    .catch((error) => {
      debug('db')(error);
      pool.end();
    });
};

/**
  * Drop Account Tables
*/

const dropAccountTables = () => {
  const tableData = 'DROP TABLE IF EXISTS accounts returning *';
  pool.query(tableData)
    .then((res) => {
      debug('db')(res);
      pool.end();
    })
    .catch((error) => {
      debug('db')(error);
      pool.end();
    });
};

/**
  * Drop Transaction Tables
*/

const dropTransactionTables = () => {
  const tableData = 'DROP TABLE IF EXISTS transaction returning *';
  pool.query(tableData)
    .then((res) => {
      debug('db')(res);
      pool.end();
    })
    .catch((error) => {
      debug('db')(error);
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
  dropUserTables();
  dropAccountTables();
  dropTransactionTables();
};

pool.on('remove', () => {
  debug('db')('tables removed');
  process.exit(0);
});

module.exports = {
  createUserTable,
  createAccountTable,
  createTransactionTable,
  createAllTables,
  dropUserTables,
  dropAccountTables,
  dropTransactionTables,
  dropAllTables,
};

require('make-runnable');
