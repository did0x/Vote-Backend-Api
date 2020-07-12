import express from 'express';
import {
    seedUser, 
    seedCandidate, 
    seedBlock,
} from '../controllers/seedController';

const router = express.Router();

router.get('/seed/user', seedUser);
router.get('/seed/candidate', seedCandidate);
router.get('/seed/block', seedBlock);

export default router;
