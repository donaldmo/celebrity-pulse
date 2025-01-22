import mongoose from 'mongoose';

const FanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  login: {
    expires: { type: String, required: true },
    time: { type: String, required: true },
  },
  purchases: [{ type: Map, of: mongoose.Schema.Types.Mixed }],
  tokens: {
    type: Number,
    default: 0,
    min: [0, 'Tokens cannot be negative'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Fan || mongoose.model('Fan', FanSchema);
