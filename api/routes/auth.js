import express from 'express';
import { register, login, registerAdmin } from '../controllers/auth.controller.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.post("/register", register);

router.post("/login", login)

router.post("/registerAdmin", verifyAdmin, registerAdmin);

export default router;