import express from 'express';
import { getRoutes, createRoute } from '../controllers/routeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getRoutes)
  .post(protect, createRoute);

export default router;
