import express from 'express';
import verifyToken from '../middleware/verifyAuth';
import { createVote, getAllVote, } from '../controllers/blockController';

const router = express.Router();

router.get('/vote', verifyToken, getAllVote);
router.post('/vote', verifyToken, createVote);

export default router;