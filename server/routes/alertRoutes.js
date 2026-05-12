import express from 'express';
import { createAlert, getAlerts, resolveAlert } from '../controllers/alertController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getAlerts)
  .post(protect, createAlert);

router.patch('/:id/resolve', protect, resolveAlert);

export default router;
