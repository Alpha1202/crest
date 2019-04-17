import uuid from 'uuid';

const date = new Date();


export default class Transactions {
  /**
     * class constructor
     * @param {object} transaction
     */
  constructor() {
    this.transactions = [
      {
        id: uuid.v4(),
        createdOn: date,
        type: 'credit',
        accountNumber: '000333112',
        cashier: 23,
        amount: 23456,
        oldBalance: '1200000',
        newBalance: '180000',

      },
    ];
  }

  /**
     * @param {object} new transaction object
     * @returns {object} transaction object
     */
  credit(transaction) {
    const creditTransaction = {
      id: uuid.v4(),
      createdOn: date,
      type: 'credit',
      accountNumber: transaction.accountNumber,
      cashier: transaction.cashier,
      amount: transaction.amount,
      oldBalance: transaction.oldBalance,
      newBalance: transaction.newBalance,
    };
    const saveTransaction = this.transactions.push(creditTransaction);
    if (saveTransaction) {
      return {
        saveTransaction,
        saved: true,
      };
    }
    return { saved: false };
  }

  debit(transaction) {
    const debitTransaction = {
      id: uuid.v4(),
      createdOn: date,
      type: 'debit',
      accountNumber: transaction.accountNumber,
      cashier: transaction.cashier,
      amount: transaction.amount,
      oldBalance: transaction.oldBalance,
      newBalance: transaction.newBalance,
    };
    const saveTransaction = this.transactions.push(debitTransaction);
    if (saveTransaction) {
      return {
        saveTransaction,
        saved: true,
      };
    }
    return { saved: false };
  }
}
