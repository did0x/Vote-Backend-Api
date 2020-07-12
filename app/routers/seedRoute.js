import express from 'express';
import {seedUser, seedCandidate} from '../controllers/seedController';

const router = express.Router();

router.get('/seed/user', seedUser);
router.get('/seed/candidate', seedCandidate);

export default router;
