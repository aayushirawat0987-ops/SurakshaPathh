import express from 'express';
const router = express.Router();
import { getSafetyScore, getSafetyTips } from '../controllers/safetyController.js';

router.get('/score', getSafetyScore);
router.get('/tips', getSafetyTips);

export default router;
