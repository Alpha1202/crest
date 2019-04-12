[![Build Status](https://travis-ci.org/Alpha1202/crest.svg?branch=develop)](https://travis-ci.org/Alpha1202/crest)    [![Coverage Status](https://coveralls.io/repos/github/Alpha1202/crest/badge.svg?branch=develop)](https://coveralls.io/github/Alpha1202/crest?branch=develop)


# CrestFinance Banka App

CrestFinance Banka App is a light-weight core banking application that powers banking operations like account creation, customer deposit and withdrawals. it supports a single bank, where users can signup and create bank accounts online.
 

Features:
 - User (client) can sign up.

 - User (client) can login.
 
 - User (client) can create an account.
 
 - User (client) can view account transaction history.
 
 - User (client) can view a specific account transaction. 

- Staff (cashier) can debit user (client) account.
 
- Staff (cashier) can credit user (client) account.

- Admin/staff can view all user accounts. 

- Admin/staff can view a specific user account.  

- Admin/staff can activate or deactivate an account.  

- Admin/staff can delete a specific user account.  

- Admin can create staff and admin user accounts. 


### API Documentation
The Documentation for the CrestFinance Banka Restful API: 
[Restful API Documentation]()

## TECHNOLOGIES
#### Client Side: 
The frontend was implemented using:
 * [Html](https://w3schools.com/) A Hyper-text mark-up language for building user interfaces
 * [css3](https://w3schools.com/) Cascading sheet for styling html pages.
 * [javascript](http://w3schools.com/) .
 
#### Backend
The Backend was implemented using: 
 * [Node](https://nodejs.org/en/) Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine
 * [Express](https://expressjs.com/) Express is a minimal and flexible Node.js web application framework 
 

### INSTALLATION
  * install [Node js](https://nodejs.org/en/) 
  * Clone the repository `https://github.com/Alpha1202/crest.git`
  * Navigate to the location in your terminal
  * Run $ npm install to install dependencies
  * Create a .env file in your root directory file to create environmental variables
  * Run $ npm run start:dev to get the app started on your local machine
  
## TESTING
#### Client side:

#### Server side:
To run tests for the server side
* Navigate to the project location in your terminal
* Run `npm run test`

### Contributing
1. Fork this [repository](https://github.com/Alpha1202/crest.git) 
2. Clone to your local environment: `https://github.com/Alpha1202/crest.git`
3. Create your feature branch: `git checkout -b my-new-feature`
4. Commit your changes: `git commit -am 'Add some feature'`
5. Write test for the new features
6. Push to the branch: `git push origin my-new-feature`
7. Submit a pull request against the `staging` branch

## Limitations
* Different users cannot create a bank account with the same email.
* Users cannot delete the bank account they created, only admin/staff.
* A admin/staff cannot create a bank account.


## FAQ
* Is this project an open source?
   * Yes it is
* Can I use this app for commercial purpose
   * This project is license under the MIT licence, hence it can use it for commercial purpose
* How do I test the online version of the project
   * Create account on the [online version](https://crestfinance.herokuapp.com/) of the app so that you can have access to the app
* When I am logged in to the app, can I create a bank account as a user
   * Yes you can
t

## ISSUES
To report an issue or give feedback, Click link
[Issues and Feedback](https://github.com/Alpha1202/crest/issues)

## Authors
* Nnamani Nzubechukwu

## Licence 
[MIT License](https://github.com/Alpha1202/crest/blob/master/LICENSE)

## Acknowledgments
* Andela Lagos Bootcamp

