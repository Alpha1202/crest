import uuid from 'uuid';
import moment from 'moment';


const accNumber = Math.ceil(Math.random() * 9999999);

export default class Account {
  /**
     * class constructor
     * @param {object} account
     */
  constructor() {
    this.accounts = [
      {
        id: uuid.v4(),
        accountNumber: '12345',
        ownerId: 2,
        type: 'current',
        status: 'active',
        openingBalance: '1200000',
        createdOn: moment.now(),
      },
      {
        id: uuid.v4(),
        accountNumber: '23451',
        ownerId: 2,
        type: 'current',
        status: 'dormant',
        openingBalance: '1200000',
        createdOn: moment.now(),
      },
      {
        id: uuid.v4(),
        accountNumber: '34251',
        ownerId: 2,
        type: 'current',
        status: 'active',
        openingBalance: '1200000',
        createdOn: moment.now(),
      },
    ];
  }

  /**
     * @param {object} new account object
     * @returns {object} account object
     */
  create(account) {
    const newAccount = {
      id: uuid.v4(),
      accountNumber: accNumber,
      ownerId: account.ownerId,
      type: account.type,
      status: account.status,
      openingBalance: account.openingBalance,
      createdOn: moment.now(),
    };
    this.accounts.push(newAccount);
    return newAccount;
  }

  /**
     * @param {uuid} accountNumber
     * @returns {object} account object
     */
  findAccount(accountNumber) {
    return this.accounts.find(acc => acc.accountNumber === accountNumber);
  }

  /**
     * @returns {object} returns all the accounts
     */
  findAllAccounts() {
    return this.accounts;
  }

  /**
     * @param {uuid} accountNumber, account
     * @param {object} account object instance
     * @returns {object} the updated account object instance
     */
  updateAcc(accountNumber, account) {
    const someAcc = this.findAccount(accountNumber);
    const found = this.accounts.indexOf(someAcc);
    this.accounts[found].status = account.status || someAcc.status;
    return this.accounts[found];
  }

  /**
     * @param {uuid} accountNumber
     * @returns {object} all accounts excluding the deleted account
     */
  deleteAcc(accountNumber) {
    const found = this.findAccount(accountNumber);
    const foundIndex = this.accounts.indexOf(found);
    this.accounts.splice(foundIndex, 1);
    return {};
  }
}