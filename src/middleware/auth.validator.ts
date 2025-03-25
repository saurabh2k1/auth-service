import { body, param } from "express-validator";

export const loginValidator = [
    body('username').isString().notEmpty().withMessage('Uername is required'),
    body('password').isString().notEmpty().withMessage('Password is required'),
    body('otp').optional().isNumeric().withMessage('OTP is required'),
];

export const registerValidator = [
    body('username').isString().notEmpty().withMessage('Uername is required'),
    body('password').isString().notEmpty().withMessage('Password is required'),
];

export const twoFASetupValidator = [
    param('userId').notEmpty().withMessage('User ID is required'),
];

export const twoFAVarifyValidator = [
    body('token').isNumeric().notEmpty().withMessage('OTP is required'),
    param('userId').notEmpty().withMessage('User ID is required'),
]