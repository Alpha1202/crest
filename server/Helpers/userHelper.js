// import { config } from 'dotenv';
// import jwt from 'jsonwebtoken';
// import db from '../db/index';

// config();

// export default class UserHelper {
// /**
//  * checks the type of user 
//  */
//   static async allowUserOnly(req, res, next) {
//     jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
//       if (err) {
//         return res.status(403).json({ status: 403, error: 'Forbidden' });
//       }
//       const { type } = authData;
//       if (type === 'Admin' || type === 'Staff') {
//         return res.status(403).json({ status: 403, error: 'Admin is not authorized' });
//       }
//       next();
//     });
//   }
// }

// const {id, email, firstName, lastName, type, isAdmin } = authData;