import express from 'express';
import { createReport, getReports, upvoteReport } from '../controllers/reportController.js';

const router = express.Router();

router.route('/')
  .get(getReports)
  .post(createReport);

router.patch('/:id/upvote', upvoteReport);

export default router;
