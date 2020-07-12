import express from 'express';

import { createVote, getAllVote, } from '../controllers/blockController';

const router = express.Router();

router.get('/vote', getAllVote);
router.post('/vote', createVote);

export default router;