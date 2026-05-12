import mongoose from 'mongoose';

const reportSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  riskLevel: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
  upvotes: { type: Number, default: 0 }
}, { timestamps: true });

const Report = mongoose.model('Report', reportSchema);
export default Report;
