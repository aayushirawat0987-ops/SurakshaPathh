import express from 'express';
import dns from 'node:dns';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Force usage of Google Public DNS to fix connection issues
dns.setServers(['8.8.8.8', '8.8.4.4']);

import authRoutes from './routes/authRoutes.js';
import alertRoutes from './routes/alertRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import routeRoutes from './routes/routeRoutes.js';
import safetyRoutes from './routes/safetyRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'https://suraksha-pathh-ochre.vercel.app',
    'http://localhost:5173',
    'http://localhost:5174',
  ],
  credentials: true,
}));
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/safety', safetyRoutes);

app.get('/', (req, res) => {
  res.send('SurakshaPath API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
