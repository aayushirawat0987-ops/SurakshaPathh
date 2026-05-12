import mongoose from 'mongoose';
import RouteModel from '../models/Route.js';

// @desc    Get all safe routes
// @route   GET /api/routes
// @access  Public
export const getRoutes = async (req, res) => {
  try {
    // MOCK MODE FALLBACK
    if (mongoose.connection.readyState !== 1) {
      return res.json([
        { _id: 'r1', name: 'Park Avenue Shortcut (MOCK)', path: [{ lat: 29.589, lng: 79.646 }, { lat: 29.591, lng: 79.648 }], safetyScore: 95, tags: ['Well-lit', 'CCTV'] },
        { _id: 'r2', name: 'Main Street Route (MOCK)', path: [{ lat: 29.590, lng: 79.645 }, { lat: 29.592, lng: 79.647 }], safetyScore: 88, tags: ['Crowded'] }
      ]);
    }

    const routes = await RouteModel.find().sort({ safetyScore: -1 });
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new route (Admin only or system seeded)
// @route   POST /api/routes
// @access  Private/Admin
export const createRoute = async (req, res) => {
  try {
    const { startPoint, endPoint, safetyScore, isNightSafe, pathCoordinates } = req.body;

    const route = await RouteModel.create({
      startPoint,
      endPoint,
      safetyScore,
      isNightSafe,
      pathCoordinates
    });

    res.status(201).json(route);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
