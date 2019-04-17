CREATE DATABASE  `banka`;

CREATE TABLE users(
    id serial NOT NULL PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    firstName VARCHAR NOT NULL,
    lastName VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    isAdmin BOOLEAN 
)

CREATE TABLE accounts(
    id serial NOT NULL PRIMARY KEY,
    accountNumber INT NOT NULL UNIQUE,
    createdOn TIMESTAMP NOT NULL,
    owner INT NOT NULL,
    type VARCHAR NOT NULL,
    status VARCHAR NOT NULL,
    balance FLOAT 
)

CREATE TABLE transactions(
    id serial NOT NULL PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL,
    type VARCHAR NOT NULL,
    accountNumber INT NOT NULL UNIQUE,
    cashier INT NOT NULL,
    amount FLOAT NOT NULL,
    oldBalance FLOAT,
    newBalance FLOAT    
)