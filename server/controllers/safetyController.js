import mongoose from 'mongoose';
import Report from '../models/Report.js';

// @desc    Calculate Safety Score for a location
// @route   GET /api/safety/score
export const getSafetyScore = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({ message: 'Location coordinates required' });
    }

    // Default "Safe" values for Mock Mode
    let score = 92;
    let riskLevel = 'Low';
    let nearbyReportsCount = 0;

    if (mongoose.connection.readyState === 1) {
      // Real DB logic: Find reports within ~2km radius
      const reports = await Report.find({
        'location.lat': { $gte: parseFloat(lat) - 0.02, $lte: parseFloat(lat) + 0.02 },
        'location.lng': { $gte: parseFloat(lng) - 0.02, $lte: parseFloat(lng) + 0.02 }
      });

      nearbyReportsCount = reports.length;
      
      // Deduction logic
      const penalty = reports.reduce((acc, report) => {
        if (report.riskLevel === 'high') return acc + 15;
        if (report.riskLevel === 'medium') return acc + 7;
        return acc + 3;
      }, 0);

      score = Math.max(0, 100 - penalty);
      
      if (score < 40) riskLevel = 'Critical';
      else if (score < 70) riskLevel = 'Medium';
      else riskLevel = 'Low';
    }

    res.status(200).json({
      score,
      riskLevel,
      nearbyReports: nearbyReportsCount,
      advice: score > 70 ? "Area looks safe. Stay alert." : "Exercise caution. Use well-lit paths.",
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Safety Tips (AI generated simulation)
// @route   GET /api/safety/tips
export const getSafetyTips = async (req, res) => {
  const tips = [
    { id: 1, title: 'Night Travel', tip: 'Always share your live location with at least 2 people in your Trusted Circle.' },
    { id: 2, title: 'Street Smart', tip: 'Avoid using noise-canceling headphones while walking alone at night.' },
    { id: 3, title: 'Digital Safety', tip: 'Keep your phone battery above 20% when heading into unfamiliar areas.' },
    { id: 4, title: 'Emergency Prep', tip: 'Memorize at least one phone number from your trusted circle.' }
  ];
  res.json(tips);
};
