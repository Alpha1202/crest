import { Pool } from 'pg';
import { config } from 'dotenv';
import moment from 'moment';
import debug from 'debug';

config();

const debugLog = debug('check');

let databaseUrl = '';

if (process.env.NODE_ENV === 'production') {
  databaseUrl = process.env.DATABASE_URL;
} else if(process.env.NODE_ENV === 'test') {
  databaseUrl = process.env.TEST_DATABASE_URL;
} else {
  databaseUrl = process.env.DEV_DATABASE_URL;
}

const pool = new Pool({
  connectionString: databaseUrl,
});

pool.on('connect', () => {
 debugLog('connected to the database');
});

/**
 * insert User Table in the database
 */
const insertUser = () => {
  const tableData = `INSERT INTO 
  users(
    email,
    firstName,
    lastName,
    password,
    type,
    isAdmin)
    VALUES('jesusandmary@gmail.com', 'Nzubechukwu', 'Nnamani', '123456', 'client', false)
  returning *`;

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
 * insert User Table in the database
 */
const insertAccount = () => {
  const accountNumberPrefix = '00';
  const generateAccountNumber = Date.now();
  const newAccountNumber = accountNumberPrefix + generateAccountNumber;
  const tableData = `INSERT INTO 
  accounts(
    accountNumber,
    createdOn,
    owneremail,
    type,
    status,
    balance)
    VALUES($1, $2, $3, $4, $5, $6)
  returning *`;
  const values = [
    newAccountNumber,
    moment(new Date()),
    'jesusandmary@gmail.com',
    'current',
    'dormant',
    0,
  ]

  pool.query(tableData, values)
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

export default {
  insertUser,
  insertAccount,
};

import 'make-runnable';