import express from 'express';

import {createUser, signinUser} from '../controllers/usersController';

const router = express.Router();

router.post('/auth/signup', createUser);
router.post('/auth/signin', signinUser);

export default router;
