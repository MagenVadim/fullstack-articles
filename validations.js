import {body} from 'express-validator'

export const loginValidattion = [
    body('email', 'Email format is wrong').isEmail(),
    body('password', 'The password must contain at least 5 characters').isLength({min: 5}),
]

export const registerValidattion = [
    body('email', 'Email format is wrong').isEmail(),
    body('password', 'The password must contain at least 5 characters').isLength({min: 5}),
    body('fullName', 'Enter your name').isLength({min: 3}),
    body('avatarURL', 'Invalid link to avatar').optional().isURL(),
]

export const postCreateValidattion = [
    body('title', 'Enter article title').isLength({min: 3}).isString(),
    body('text', 'Enter article text').isLength({min: 10}).isString(),
    body('tags', 'Invalid tag format (array required)').optional().isArray(),
    body('imageUrl', 'Invalid link to image').optional().isString(),
]