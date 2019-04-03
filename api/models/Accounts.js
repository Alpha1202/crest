import uuid from 'uuid';
import moment from 'moment';

export default class Account {
    /**
     * class constructor
     * @param {object} account
     */
    constructor() {
        this.accounts = [
            {
               id: 1,
               accountNumber: 0033456,
               createdOn: 23-04-2019,
               ownerId: 1,
               type: "current",
               status: "active",
               balance: 1000034.05,
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
        accountNumber: account.accountNumber,
        createdOn: moment.now(),
        ownerId: account.ownerId,
        type: account.type,
        status: account.status,
        type: account.type,
        openingBalance: account.balance
        };
        this.accounts.push(newAccount);
        return newAccount
    }
    /**
     * @param {uuid} accountNumber
     * @returns {object} account object
     */
    findAnAccount(accountNumber) {
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
        const someAcc = this.findAnAccount(accountNumber);
        const found = this.accounts.indexOf(someAcc);
        this.accounts[found].status = account['status'] || someAcc.status;
        return this.accounts[found];
    }
    /**
     * @param {uuid} accountNumber
     * @returns {object} all accounts excluding the deleted account
     */
    deleteAnAcc(accountNumber) {
        const someAcc = this.findAnAccount(accountNumber);
        const found = this.accounts.indexOf(someAcc);
        this.accounts.splice(found, 1);
        return this.accounts;
    }
}