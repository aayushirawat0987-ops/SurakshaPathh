import mongoose from 'mongoose';

const alertSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  status: { type: String, enum: ['active', 'resolved'], default: 'active' },
  message: { type: String }
}, { timestamps: true });

const Alert = mongoose.model('Alert', alertSchema);
export default Alert;
