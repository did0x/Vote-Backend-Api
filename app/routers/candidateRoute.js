import express from 'express';

import { getAllCandidate } from '../controllers/candidateController';

const router = express.Router();

router.get('/candidate', getAllCandidate);

export default router;
