import uuid from 'uuid';
import moment from 'moment';



export default class Transactions {
    /**
     * class constructor
     * @param {object} transaction
     */
    constructor() {
        this.transactions = [
            {
                id: uuid.v4(),
                createdOn: moment.now(),
                type: "credit",
                accountNumber: '000333112',
                cashier: 23, 
                amount: 23456,
                oldBalance: "1200000",
                newBalance: '180000'
                
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
        createdOn: moment.now(),
        type: 'credit',
        accountNumber: transaction.accountNumber,
        cashier: transaction.cashier,
        amount: transaction.amount,
        oldBalance: transaction.oldBalance,
        newBalance: transaction.newBalance
        };
        this.transactions.push(creditTransaction);
        return creditTransaction;
    }

    debit(transaction) {
        const debitTransaction = {
        id: uuid.v4(),
        createdOn: moment.now(),
        type: 'debit',
        accountNumber: transaction.accountNumber,
        cashier: transaction.cashier,
        amount: transaction.amount,
        oldBalance: transaction.oldBalance,
        newBalance: transaction.newBalance
        };
        this.transactions.push(debitTransaction);
        return debitTransaction;
    }
   
}