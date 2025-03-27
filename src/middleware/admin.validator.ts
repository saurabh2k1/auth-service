import { body, param } from "express-validator";

export const updateRoleValidator = [
    param('userId').notEmpty().withMessage('User ID is required'),
    body('role').isIn(['user', 'admin', 'superadmin']).withMessage('Invalid role'),
];

export const deleteUserValidator = [
    param('userId').notEmpty().withMessage('User ID is required'),
];