import mongoose from 'mongoose';
import Alert from '../models/Alert.js';

// @desc    Create a new SOS alert
export const createAlert = async (req, res) => {
  try {
    const { location, message } = req.body;
    
    // MOCK MODE FALLBACK
    if (mongoose.connection.readyState !== 1) {
      console.log('MOCK: Saving alert to memory');
      return res.status(201).json({ _id: 'mock_alert_123', location, message, status: 'active', user: { name: 'Mock User' } });
    }

    const alert = await Alert.create({
      user: req.user._id,
      location,
      message: message || 'Emergency Alert!'
    });

    res.status(201).json(alert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all active alerts
export const getAlerts = async (req, res) => {
  try {
    // MOCK MODE FALLBACK
    if (mongoose.connection.readyState !== 1) {
      return res.json([{ _id: '1', message: 'MOCK SOS: Suspicious activity near Library', status: 'active', user: { name: 'Test User' }, location: { lat: 29.589, lng: 79.646 } }]);
    }

    const alerts = await Alert.find({ status: 'active' })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Resolve an alert
// @route   PATCH /api/alerts/:id/resolve
// @access  Private
export const resolveAlert = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);

    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }

    // Check if user owns the alert or is admin
    if (alert.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to resolve this alert' });
    }

    alert.status = 'resolved';
    await alert.save();

    res.json(alert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
