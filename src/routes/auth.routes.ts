import { loginUser, registerUser, setupTOTP, verifyOTPForTOTP } from "../controllers/auth.controller";
import { authenticateJWT } from "../middleware/auth.middleware";
import { loginValidator, registerValidator, twoFASetupValidator, twoFAVarifyValidator } from "../middleware/auth.validator";

const router = require('express').Router();

//public routes
router.post('/register', registerValidator, registerUser);
router.post('/login', loginValidator, loginUser);

//Protected routes
router.post('/2fa/setup/:userId', [authenticateJWT, twoFASetupValidator ], setupTOTP);
router.post('/2fa/verify/:userId', [authenticateJWT, twoFAVarifyValidator ], verifyOTPForTOTP);


export default router;

