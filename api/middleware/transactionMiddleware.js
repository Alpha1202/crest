import { body } from 'express-validator/check';


exports.validate = (method) => {
    switch (method) {
        case 'transaction': {
            return [
                body('amount', 'please enter an amount')
                .trim()
                .exists()
                .withMessage('Please enter an amount')
                .isFloat()
                .withMessage('That is not a valid amount')
                .isLength({ min: 1 })
                .withMessage('Please enter a valid figure'),
            ]
        }
   
}
}
