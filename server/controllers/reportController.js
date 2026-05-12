import mongoose from 'mongoose';
import Report from '../models/Report.js';

// @desc    Create a new community report
export const createReport = async (req, res) => {
  try {
    const { title, description, location, riskLevel } = req.body;

    // MOCK MODE FALLBACK
    if (mongoose.connection.readyState !== 1) {
      return res.status(201).json({ _id: 'mock_report_' + Date.now(), title, description, location, riskLevel, upvotes: 0 });
    }

    const report = await Report.create({
      title,
      description,
      location,
      riskLevel: riskLevel || 'medium'
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all reports for heatmap
export const getReports = async (req, res) => {
  try {
    // MOCK MODE FALLBACK
    if (mongoose.connection.readyState !== 1) {
      return res.json([
        { _id: '1', title: 'Suspicious Activity (MOCK)', description: 'Group of people gathering near shortcut.', location: { lat: 29.589, lng: 79.646 }, riskLevel: 'high', upvotes: 12 },
        { _id: '2', title: 'Streetlight Broken (MOCK)', description: 'Main road is completely dark.', location: { lat: 29.590, lng: 79.645 }, riskLevel: 'medium', upvotes: 5 }
      ]);
    }

    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upvote a report
// @route   PATCH /api/reports/:id/upvote
// @access  Public
export const upvoteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    report.upvotes += 1;
    await report.save();

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
