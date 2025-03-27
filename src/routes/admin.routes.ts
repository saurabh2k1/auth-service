import { Router } from "express";
import { authenticateJWT } from "../middleware/auth.middleware";
import { deleteUser, getAllUsers, updateUserRole } from "../controllers/admin.controller";
import { isAdmin } from "../middleware/admin.middleware";

const router = Router();

router.use([authenticateJWT, isAdmin]);

router.get('/users', getAllUsers);

router.put('/users/:userId', updateUserRole);

router.delete('/users/:userId', deleteUser);    


export default router;