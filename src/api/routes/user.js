import { Router } from 'express';
import { changePassword, deleteUser, getUser, login, register } from '../controllers/user/index.js';
import { auth } from '../middlewares/index.js';

const router = Router();

// AUTH
router.post('/signup', register);
router.post('/login', login);

// EDIT
router.post('/change-password', auth, changePassword);

router.get('/', auth, getUser);
router.delete('/', auth, deleteUser);

export default router