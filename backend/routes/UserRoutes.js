import express from 'express';
const router = express.Router();

import UserController from '../controllers/UserControllers.js';

router.post('/signup', UserController.signUp);
router.get('/signin', UserController.signIn)

export default router;