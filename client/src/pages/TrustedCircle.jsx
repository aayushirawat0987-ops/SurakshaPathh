import React, { useState, useEffect } from 'react';
import { Users, UserPlus, CheckCircle2, X, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSafety } from '../context/SafetyContext';

const TrustedCircle = () => {
  const { location } = useSafety();
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [messageLogs, setMessageLogs] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const savedContacts = localStorage.getItem('trusted_circle');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    } else {
      const defaultContacts = [
        { id: 1, name: 'Family Guard', phone: '+91 9876543210', status: 'Online', tracking: true },
      ];
      setContacts(defaultContacts);
      localStorage.setItem('trusted_circle', JSON.stringify(defaultContacts));
    }

    const savedLogs = localStorage.getItem('message_logs');
    if (savedLogs) setMessageLogs(JSON.parse(savedLogs));
  }, []);

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!newName || !newPhone) return;

    const newContact = {
      id: Date.now(),
      name: newName,
      phone: newPhone,
      status: 'Offline',
      tracking: false
    };

    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    localStorage.setItem('trusted_circle', JSON.stringify(updatedContacts));
    
    setNewName('');
    setNewPhone('');
    setShowModal(false);
  };

  const removeContact = (id) => {
    const updated = contacts.filter(c => c.id !== id);
    setContacts(updated);
    localStorage.setItem('trusted_circle', JSON.stringify(updated));
  };

  const handleSendCheckIn = () => {
    if (contacts.length === 0) {
      alert("Please add at least one contact to your circle first.");
      return;
    }

    setIsSending(true);
    
    // Simulate sending time
    setTimeout(() => {
      setIsSending(false);
      
      const newLog = {
        id: Date.now(),
        text: "I have reached safely.",
        sentTo: contacts.length,
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString()
      };
      
      const updatedLogs = [newLog, ...messageLogs].slice(0, 5);
      setMessageLogs(updatedLogs);
      localStorage.setItem('message_logs', JSON.stringify(updatedLogs));

      // Trigger REAL SMS Deep Link
      if (confirm(`Simulated alerts triggered! Would you like to open your phone's messaging app to send a real SMS to your ${contacts.length} contacts?`)) {
        contacts.forEach(contact => {
          const smsUrl = `sms:${contact.phone}?body=SurakshaPath Alert: I have reached safely! My current location: https://maps.google.com/?q=${location.lat},${location.lng}`;
          window.open(smsUrl, '_blank');
        });
      }
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Users className="text-cyber-neonPurple w-8 h-8" />
            Trusted <span className="text-cyber-neonPurple">Circle</span>
          </h1>
          <p className="text-gray-400">Manage who can see your live location during emergencies.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-cyber-neonPurple text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-purple-600 transition"
        >
          <UserPlus className="w-5 h-5" /> Add Contact
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <AnimatePresence>
          {contacts.map((contact) => (
            <motion.div 
              key={contact.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-cyber-navyLight flex items-center justify-center text-xl font-bold text-cyber-neonPurple border border-cyber-neonPurple/30">
                  {contact.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{contact.name}</h3>
                  <p className="text-sm font-mono text-cyber-neonBlue bg-cyber-neonBlue/10 px-2 py-0.5 rounded border border-cyber-neonBlue/20 mt-1 inline-block">
                    {contact.phone || "No Number Provided"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button 
                  onClick={() => removeContact(contact.id)}
                  className="text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <span className={`text-xs px-2 py-1 rounded-full ${contact.status === 'Online' ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-400'}`}>
                  {contact.status}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="glass-card bg-cyber-neonPurple/5 border-cyber-neonPurple/30 flex flex-col md:flex-row items-center justify-between p-6 mb-8">
        <div>
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <CheckCircle2 className="text-green-500" /> Reached Safely?
          </h2>
          <p className="text-gray-400">Send an automated "Reached safely" alert to your circle.</p>
        </div>
        <button 
          onClick={handleSendCheckIn}
          disabled={isSending}
          className={`mt-4 md:mt-0 bg-green-500 text-white px-8 py-3 rounded-xl font-bold shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:bg-green-600 transition flex items-center gap-2 ${isSending ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSending ? 'Sending...' : 'Send Check-in'}
        </button>
      </div>

      {/* Message History */}
      {messageLogs.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Users className="text-cyber-neonPurple w-5 h-5" /> Recent Activity
          </h2>
          <div className="space-y-3">
            {messageLogs.map(log => (
              <div key={log.id} className="p-4 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center group">
                <div>
                  <p className="text-sm font-medium text-cyber-neonGreen">"{log.text}"</p>
                  <p className="text-xs text-gray-500">Sent to {log.sentTo} contacts</p>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setShowPreview(true)}
                    className="text-xs text-cyber-neonBlue border border-cyber-neonBlue/30 px-2 py-1 rounded hover:bg-cyber-neonBlue/10 transition"
                  >
                    👁️ View SMS
                  </button>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{log.time}</p>
                    <p className="text-[10px] text-gray-600">{log.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* SMS Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPreview(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="relative w-[300px] h-[600px] bg-[#000] border-[8px] border-[#333] rounded-[40px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              {/* Phone Top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#333] rounded-b-2xl z-10"></div>
              
              {/* Phone Content */}
              <div className="h-full w-full bg-white p-4 pt-12">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">S</div>
                  <div>
                    <p className="text-[10px] font-bold text-black">SurakshaPath</p>
                    <p className="text-[8px] text-gray-400">Emergency Alert System</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none text-black text-xs shadow-sm max-w-[80%]">
                    <p className="font-bold text-cyber-neonPurple mb-1">ALERT</p>
                    <p>I have reached safely. This is an automated update from my SurakshaPath safety circle.</p>
                    <p className="mt-2 text-[10px] text-blue-600 underline">maps.google.com/safety/loc...</p>
                  </div>
                </div>
              </div>

              {/* Home Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gray-300 rounded-full"></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Contact Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-cyber-navyLight border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold mb-6 text-cyber-neonPurple">Add Trusted Contact</h2>
              <form onSubmit={handleAddContact} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-cyber-darkBg border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyber-neonPurple transition-all"
                    placeholder="e.g. Mom"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full bg-cyber-darkBg border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyber-neonPurple transition-all"
                    placeholder="e.g. +91 98765 43210"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-cyber-neonPurple text-white py-4 rounded-xl font-bold shadow-[0_0_20px_rgba(188,19,254,0.3)] hover:shadow-[0_0_30px_rgba(188,19,254,0.5)] transition-all"
                >
                  Save to Circle
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrustedCircle;
