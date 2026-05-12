import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ThumbsUp, MapPin, Plus } from 'lucide-react';

const CommunityAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch('/api/reports');
      const data = await res.json();
      if (res.ok) {
        setAlerts(data);
      }
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const [newReport, setNewReport] = useState({
    title: '',
    description: '',
    riskLevel: 'medium',
    location: { lat: 29.589, lng: 79.646 }
  });

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReport)
      });

      if (res.ok) {
        setNewReport({ title: '', description: '', riskLevel: 'medium', location: { lat: 29.589, lng: 79.646 } });
        setShowForm(false);
        fetchReports(); // Refresh list
      }
    } catch (error) {
      console.error("Failed to submit report:", error);
    }
  };

  const handleUpvote = async (id) => {
    try {
      const res = await fetch(`/api/reports/${id}/upvote`, { method: 'PATCH' });
      if (res.ok) {
        fetchReports(); // Refresh list
      }
    } catch (error) {
      console.error("Failed to upvote:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <AlertCircle className="text-cyber-neonPink w-8 h-8" />
            Community <span className="text-cyber-neonPink">Alerts</span>
          </h1>
          <p className="text-gray-400">Anonymous safety reports from users around you.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-cyber-neonPink text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-pink-600 transition"
        >
          <Plus className="w-5 h-5" /> Report Issue
        </button>
      </div>

      {showForm && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="glass-card mb-8 border-cyber-neonPink/50"
        >
          <h2 className="text-xl font-bold mb-4">Submit Anonymous Report</h2>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Title (e.g., Broken Streetlight)" 
              value={newReport.title}
              onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
              className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-cyber-neonPink outline-none" 
            />
            <textarea 
              placeholder="Description..." 
              value={newReport.description}
              onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
              className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-cyber-neonPink outline-none" 
              rows="3"
            ></textarea>
            <div className="flex justify-between items-center">
              <select 
                value={newReport.riskLevel}
                onChange={(e) => setNewReport({ ...newReport, riskLevel: e.target.value })}
                className="bg-black/30 border border-white/10 rounded p-2 text-sm text-white outline-none"
              >
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
              <div className="flex gap-2">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                <button 
                  onClick={handleReportSubmit}
                  className="bg-cyber-neonPink text-white px-6 py-2 rounded font-bold hover:bg-pink-600 transition"
                >
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No reports found in this area yet.</div>
        ) : alerts.map((alert, idx) => (
          <motion.div 
            key={alert._id || idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card relative overflow-hidden"
          >
            <div className={`absolute left-0 top-0 w-1 h-full ${alert.riskLevel === 'high' ? 'bg-red-500' : alert.riskLevel === 'medium' ? 'bg-orange-500' : 'bg-yellow-500'}`}></div>
            <div className="flex justify-between items-start">
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full font-bold ${alert.riskLevel === 'high' ? 'bg-red-500/20 text-red-500' : alert.riskLevel === 'medium' ? 'bg-orange-500/20 text-orange-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                    {alert.riskLevel} Risk
                  </span>
                  <span className="text-xs text-gray-500">{new Date(alert.createdAt).toLocaleDateString()}</span>
                </div>
                <h3 className="text-lg font-bold">{alert.title}</h3>
                <p className="text-gray-300 text-sm mt-1">{alert.description}</p>
                <div className="flex items-center gap-1 text-gray-400 text-xs mt-3">
                  <MapPin className="w-3 h-3 text-cyber-neonPink" /> 
                  Location: {alert.location?.lat.toFixed(4)}, {alert.location?.lng.toFixed(4)}
                </div>
              </div>
              <button 
                onClick={() => handleUpvote(alert._id)}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-cyber-neonPink min-w-[60px]"
              >
                <ThumbsUp className="w-5 h-5 mb-1" />
                <span className="font-bold">{alert.upvotes || 0}</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommunityAlerts;
