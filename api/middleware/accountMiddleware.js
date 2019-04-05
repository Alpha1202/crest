import { body } from 'express-validator/check';

exports.validate = (method) => {
    switch (method) {
        case 'createAccount': {
            return [
                body('type', 'please enter account type, savings or current')
                .trim()
                .exists()
                .withMessage('Account type is required')
                // .contains('savings', 'current')
                // .withMessage('Please chose either savings or current')
                .isAlpha()
                .withMessage('Only alphabetical characters are allowed'),
                // .custom((type, { req }) => {
                //      type = req.body.type
                //     if(typeof type !== 'savings' || 'current') {
                //         throw new Error('Please chose either savings or current')
                //     }
                
                // }),
                

                 body('status', 'please specify status')
                 .trim()
                .exists()
                .withMessage('Please specify status')
                .isAlpha()
                .withMessage('Only alphabetical characters are allowed')
                .contains('active')
                .withMessage('Please chose either active or dormant or draft'),

                 body('openingBalance', 'please enter the opening Balance')
                 .trim()
                .exists()
                .withMessage('Please enter the opening Balance')
                .isFloat()
                .withMessage('Only numbers are allowed')
                .isLength({ min: 3 })
                .withMessage('Must be at least 3 characters long'),
            ]
        }
    // case 'signin': {
    //     return [
    //     body('email', 'please enter a valid email')
    //     .trim()
    //     .exists()
    //     .withMessage('Email is required')
    //     .isEmail()
    //     .withMessage('Please enter a valid email')
    //     .normalizeEmail({ all_lowercase: true }),

    //     body('password', 'please enter your password')
    //     .exists()
    //     .withMessage('Please enter your password')
    //     .isLength({ min: 6 })
    //     .withMessage('Password should be atleast six characters')
    // ]  
    // } 
}
}

// exports.verifyToken = (req, res, next) => {
//     const bearerHeader = req.headers['authorization'];

//     if(typeof bearerHeader !== 'undefined') {
//         const bearer = bearerHeader.split(' ');
//         const bearerToken = bearer[1];
//         req.token = bearerToken;
//         next();   
//     } else {
//         res.status(403).json({error: 'You are not authorised'});
//     }
// }