import { body, param } from 'express-validator/check';


exports.validate = (method) => {
    switch (method) {
        case 'createAccount': {
            return [
                body('type', 'please enter account type, savings or current')
                .trim()
                .exists()
                .withMessage('Account type is required')
                .isAlpha()
                .withMessage('Only alphabetical characters are allowed'),
               
                

                 body('status', 'please specify status')
                 .trim()
                .exists()
                .withMessage('Please specify status')
                .isAlpha()
                .withMessage('Only alphabetical characters are allowed'),
            

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
    case 'patchAcc': {
        return [
        param('accountNumber', 'Please enter an account number')
        .trim()
        .exists()
        .withMessage('Please enter account')
        .isFloat()
        .withMessage('Account number can only contain numbers')
    .withMessage('Password should be atleast six characters')
    ]  
    } 
}
}
