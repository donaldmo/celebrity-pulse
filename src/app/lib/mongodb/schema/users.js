import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  login: {
    expires: { type: String, required: true },
    time: { type: String, required: true },
  },
  purchases: [{ type: Map, of: mongoose.Schema.Types.Mixed }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
