import express from 'express';
import { AuthController } from '../controller/authController';

const router = express.Router();
const authController = new AuthController();

router.get('/login', authController.showLoginPage);
router.post('/login', authController.login);
router.get('/profile/:id', authController.showProfile);
router.get('/register', authController.showRegisterPage);
router.post('/register', authController.register);

export default router;
