import { body } from 'express-validator/check';

exports.validate = (method) => {
    switch (method) {
        case 'signup': {
            return [
                body('email', 'please enter a valid email')
                .trim()
                .exists()
                .withMessage('Email is required')
                .isEmail()
                .withMessage('Please enter a valid email')
                .normalizeEmail({ all_lowercase: true }),

                 body('firstName', 'please enter a valid name')
                 .trim()
                .exists()
                .withMessage('You must enter your First Name')
                .isAlpha()
                .withMessage('Only alphabetical characters are allowed')
                .isLength({ min: 3 })
                .withMessage('Must be at least 3 characters long'),

                 body('lastName', 'please enter a valid name')
                 .trim()
                .exists()
                .withMessage('You must enter your Last Name')
                .isAlpha()
                .withMessage('Only alphabetical characters are allowed')
                .isLength({ min: 3 })
                .withMessage('Must be at least 3 characters long'),

                body('password', 'please enter your password')
                .exists()
                .withMessage('Please enter your password')
                .isLength({ min: 6 })
                .withMessage('Password should be atleast six characters')
            ]
        }
    case 'signin': {
        return [
        body('email', 'please enter a valid email')
        .trim()
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail({ all_lowercase: true }),

        body('password', 'please enter your password')
        .exists()
        .withMessage('Please enter your password')
        .isLength({ min: 6 })
        .withMessage('Password should be atleast six characters')
    ]  
    } 
}
}

exports.verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();   
    } else {
        res.status(403).json({error: 'You are not authorised'});
    }
}