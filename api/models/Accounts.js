import uuid from 'uuid';


const accountNumberPrefix = '00';
const generateAccountNumber = Date.now();
const newAccountNumber = accountNumberPrefix + generateAccountNumber;


const date = new Date();


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
        openingBalance: '10000',
        createdOn: date,
      },
      {
        id: uuid.v4(),
        accountNumber: '23451',
        ownerId: 2,
        type: 'current',
        status: 'dormant',
        openingBalance: '0',
        createdOn: date,
      },
      {
        id: uuid.v4(),
        accountNumber: '34251',
        ownerId: 2,
        type: 'current',
        status: 'active',
        openingBalance: '0',
        createdOn: date,
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
      accountNumber: newAccountNumber,
      ownerId: account.ownerId,
      type: account.type,
      status: 'dormant',
      openingBalance: 0,
      createdOn: date,
    };
    const saveAccount = this.accounts.push(newAccount);
    if (saveAccount) {
      return {
        newAccount,
        saved: true,
      };
    }
    return { saved: false };
  }

  /**
     * @param {uuid} accountNumber
     * @returns {object} account object
     */
  findAccount(accountNumber) {
    return this.accounts.find(acc => acc.accountNumber === accountNumber);
  }

  /**
     * @returns {object} stores account to the dummy database
     */
  save(data) {
    return this.accounts.push(data);
  }


  /**
     * @param {} accountNumber
     * @returns {object} all accounts excluding the deleted account
     */
  deleteAccount(accountNumber) {
    const found = this.findAccount(accountNumber);
    const foundIndex = this.accounts.indexOf(found);
    this.accounts.splice(foundIndex, 1);
    return {};
  }
}
