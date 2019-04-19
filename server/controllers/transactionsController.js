import { config } from 'dotenv';
import db from '../db/index';
// import TransactionHelper from '../Helpers/transactionHelper';


config();

export default class TransactionController {
  /** POST a debit transaction
     * @param {object} req
     * @param {object} res
    */

  static async debit(req, res) {
    const { accountNumber } = req.params;
    const { amount } = req.body;

    const updatedAccount = 'SELECT * FROM accounts WHERE accountNumber = $1';

    const result = await db.query(updatedAccount, [accountNumber]);
    const { accountnumber, createdon, balance } = result.rows[0];
    const oldBalance = amount + balance;
    const newTransaction = `INSERT INTO
    transactions(
      createdon,
      type,
      accountNumber,
      cashier,
      amount,
      oldBalance,
      newBalance)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;

    const values = [
      createdon,
      'debit',
      accountnumber,
      2,
      amount,
      oldBalance,
      balance,
    ];
    try {
      const { rows } = await db.query(newTransaction, values);
      const transactionData = rows[0];
      return res.status(200).json({ status: 200,
        data: {
          transactionData,
        },
      });
    } catch (err) {
      return res.status(500).json({ status: 500, err });
    }
  }


  /**
   * 
   */

  static async credit(req, res) {
    const { accountNumber } = req.params;
    const { amount } = req.body;

    const updatedAccount = 'SELECT * FROM accounts WHERE accountNumber = $1';

    const result = await db.query(updatedAccount, [accountNumber]);
    const { accountnumber, createdon, balance } = result.rows[0];
    const oldBalance = balance - amount;
    const newTransaction = `INSERT INTO
    transactions(
      createdon,
      type,
      accountNumber,
      cashier,
      amount,
      oldBalance,
      newBalance)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;

    const values = [
      createdon,
      'credit',
      accountnumber,
      2,
      amount,
      oldBalance,
      balance,
    ];
    try {
      const { rows } = await db.query(newTransaction, values);
      const transactionData = rows[0];
      return res.status(200).json({ status: 200,
        data: {
          transactionData,
        },
      });
    } catch (err) {
      return res.status(500).json({ status: 500, err });
    }
  }
}


// const accountBalance = oldBalance - amount;
//       checkAccountNumber.openingBalance = accountBalance;




//     jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
//       if (err) {
//         return res.status(403).json({status: 403, error: 'Forbidden' });
//       }

//       const { id, isAdmin } = authData;
//       if (isAdmin === false) {
//         return res.status(403).json({ status: 403, error: 'Only Admin is authorized'});
//       }

//       const { accountNumber } = req.params;
//       const checkAccountNumber = account.findAccount(accountNumber);
//       if (!checkAccountNumber) {
//         return res.status(404).json({status: 404, error: 'Account Number does not exist' });
//       }


//       const { status, openingBalance } = checkAccountNumber;
//       if (status === 'dormant') {
//         return res.status(400).json({status: 400, error: 'This account is dormant, please activate' });
//       }
//       const { amount } = req.body;
//       if (!amount || amount === 'undefined') {
//         return res.status(400).json({status: 400, error: 'Please specify an amount' });
//       }
//       const oldBalance = openingBalance;
//       if (oldBalance <= 0 && oldBalance < amount) {
//         return res.status(400).json({ status: 400, error: 'You have insufficient balance' });
//       }

//       const accountBalance = oldBalance - amount;
//       checkAccountNumber.openingBalance = accountBalance;

//       const debitTransaction = transaction.debit(amount);
//       if (debitTransaction.saved) {
//         return res.status(200).json({
//           status: 200,
//           data: {
//             transactionId: uuid.v4(),
//             accountNumber,
//             amount,
//             cashier: id,
//             transactionType: 'debit',
//             accountBalance,
//           },
//         });
//       }
//       return res.status(400).json({
//         status: 400,
//         error: 'Debit transaction failed',
//       });
//     });
//   }

//   static credit(req, res) {
//     jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
//       if (err) {
//         return res.status(403).json({ status: 403, error: 'Forbidden' });
//       }

//       const { id, isAdmin } = authData;
//       if (isAdmin === false) {
//         return res.status(403).json({ status: 403, error: 'Only Admin is authorized'});
//       }

//       const { accountNumber } = req.params;

//       const checkAccountNumber = account.findAccount(accountNumber);
//       if (!checkAccountNumber) {
//         return res.status(404).json({ status: 404, error: 'Account Number does not exist' });
//       }

//       const { status, openingBalance } = checkAccountNumber;
//       if (status === 'dormant') {
//         return res.status(400).json({ status: 400, error: 'This account is dormant, please activate' });
//       }

//       const { amount } = req.body;
//       if (!amount || amount === 'undefined') {
//         return res.status(400).json({ status: 400, error: 'Please specify an amount' });
//       }
//       const oldBalance = openingBalance;

//       const accountBalance = parseFloat(oldBalance) + parseFloat(amount);

//       checkAccountNumber.openingBalance = accountBalance;

//       const creditTransaction = transaction.credit(amount);
//       if (creditTransaction.saved) {
//         return res.status(200).json({
//           status: 200,
//           data: {
//             transactionId: uuid.v4(),
//             accountNumber,
//             amount,
//             cashier: id,
//             transactionType: 'Credit',
//             accountBalance: parseFloat(accountBalance),
//           },
//         });
//       }
//       return res.status(400).json({
//         status: 400,
//         error: 'Credit transaction failed',
//       });
//     });
//   }
// }

