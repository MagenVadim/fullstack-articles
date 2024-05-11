import {body} from 'express-validator'

export const registerValidattion = [
    body('email', 'Email format is wrong').isEmail(),
    body('password', 'The password must contain at least 5 characters').isLength({min: 5}),
    body('fullName', 'Enter your name').isLength({min: 3}),
    body('avatarUrl', 'Invalid link to avatar').optional().isURL(),
]