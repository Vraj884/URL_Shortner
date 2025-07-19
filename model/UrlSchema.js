import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema({
  shortCode: { type: String, unique: true, require: true },
  longUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Url || mongoose.model('Url', UrlSchema);
