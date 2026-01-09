const mongoose = require('mongoose');

const tradelineSchema = new mongoose.Schema(
  {
    bankName: { type: String, required: true, trim: true },
    cardAgeMonths: { type: Number, required: true, min: 1 },
    creditLimitMin: { type: Number, required: true, min: 0 },
    creditLimitMax: { type: Number, required: true, min: 0 },
    placementFee: { type: Number, required: true, min: 0 },
    totalSlots: { type: Number, required: true, min: 0 },
    availableSlots: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    featured: { type: Boolean, default: false },
    metadata: {
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
  },
  {
    timestamps: true,
  }
);

tradelineSchema.index({ status: 1, availableSlots: 1 });
tradelineSchema.index({ bankName: 'text' });

module.exports = mongoose.model('Tradeline', tradelineSchema);
