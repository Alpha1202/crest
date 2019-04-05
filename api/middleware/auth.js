import jwt from 'jsonwebtoken';
import  config  from 'config';

// config();

// const secret = process.env.JWT_SECRET

export default class Auth {
    /**
     * create a new token
     * @param {object} req request object
     * @param {object} returns an object 
     */
    static verifyToken(req, res, next) {
        try {
            const token = req.headers['authorization']; 
            if(typeof token !== 'undefined') {
                const bearer = token.split(' ');
                const bearerToken = bearer[1];
                req.token = bearerToken;
                next();
            } else {
             res.status(403).json({error: 'You are not authorised'});
            }
        }
         catch (error) {
            res.status(400).json({error: 'Access token not valid'});
        }
    }
}

   /**
 * Middleware for protecting  user router using jwt
 * @param {object} req request object
 * @param {object} res response object
 * @param {function} next calls the next function
 * @return {object} returns an object
 */
    // static async verifyUser  (req, res, next)  {
    //     try {
    //         const checkUser = await Auth.checkToken(req)
    //         req.user = checkUser.user
    //         next();
    //         return true;
    //       } catch (error) {
    //             return res.status(401).send({ 
    //                 message: error.message
    //             });
    //         }
        // const bearerHeader = req.headers['authorization'];
    
        // if(typeof bearerHeader !== 'undefined') {
        //     const bearer = bearerHeader.split(' ');
        //     const bearerToken = bearer[1];
        //     req.token = bearerToken;
        //     next();   
        // } else {
        //     res.status(403).json({error: 'You are not authorised'});
        // }



