const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tradeline: { type: mongoose.Schema.Types.ObjectId, ref: 'Tradeline', required: true },
    status: {
      type: String,
      enum: ['pending', 'submitted', 'placed', 'completed'],
      default: 'pending',
    },
    amount: { type: Number, required: true, min: 0 },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'failed'],
      default: 'unpaid',
    },
    userInfo: {
      fullName: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true, lowercase: true },
      phone: { type: String, required: true, trim: true },
      dob: { type: String, required: true, trim: true },
      address: { type: String, trim: true },
    },
    adminNotes: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

requestSchema.index({ user: 1, createdAt: -1 });
requestSchema.index({ tradeline: 1 });

module.exports = mongoose.model('TradelineRequest', requestSchema);
