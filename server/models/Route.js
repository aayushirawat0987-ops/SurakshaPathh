import mongoose from 'mongoose';

const routeSchema = mongoose.Schema({
  startPoint: { type: String, required: true },
  endPoint: { type: String, required: true },
  safetyScore: { type: Number, default: 100 },
  isNightSafe: { type: Boolean, default: true },
  pathCoordinates: [{
    lat: Number,
    lng: Number
  }],
  incidentsReported: { type: Number, default: 0 }
}, { timestamps: true });

const RouteModel = mongoose.model('Route', routeSchema);
export default RouteModel;
