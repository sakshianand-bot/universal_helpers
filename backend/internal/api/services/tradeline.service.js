const Tradeline = require('../../database/models/Tradeline');
const { AppError } = require('../../common/error-handler');
const { logger } = require('../../common/logger');
const { validate } = require('../../common/validation');

class TradelineService {
  async createTradeline(data, userId) {
    const payload = validate(data, 'tradelineCreate');
    if (payload.availableSlots > payload.totalSlots) {
      throw new AppError('Available slots cannot exceed total slots', 400, 'VALIDATION_ERROR');
    }

    try {
      const tradeline = await Tradeline.create({
        ...payload,
        metadata: { createdBy: userId },
      });
      logger.info('Tradeline created', { id: tradeline.id, userId });
      return tradeline;
    } catch (error) {
      logger.error('Create tradeline error', { error: error.message });
      throw error;
    }
  }

  async listActiveTradelines() {
    return Tradeline.find({
      status: 'active',
      availableSlots: { $gt: 0 },
    }).sort({ featured: -1, createdAt: -1 });
  }

  async listAllTradelines(filters = {}) {
    const query = {};
    if (filters.status) {
      query.status = filters.status;
    }
    if (filters.search) {
      query.bankName = { $regex: filters.search, $options: 'i' };
    }
    return Tradeline.find(query).sort({ createdAt: -1 });
  }

  async updateTradeline(id, data, userId) {
    const payload = validate(data, 'tradelineUpdate');
    if (
      payload.availableSlots !== undefined &&
      payload.totalSlots !== undefined &&
      payload.availableSlots > payload.totalSlots
    ) {
      throw new AppError('Available slots cannot exceed total slots', 400, 'VALIDATION_ERROR');
    }

    try {
      const tradeline = await Tradeline.findByIdAndUpdate(
        id,
        {
          ...payload,
          'metadata.updatedBy': userId,
        },
        { new: true, runValidators: true }
      );
      if (!tradeline) throw new AppError('Tradeline not found', 404, 'NOT_FOUND');
      return tradeline;
    } catch (error) {
      logger.error('Update tradeline error', { error: error.message, id });
      throw error;
    }
  }

  async updateTradelineStatus(id, status, userId) {
    validate({ status }, 'tradelineStatusUpdate');
    const tradeline = await Tradeline.findByIdAndUpdate(
      id,
      { status, 'metadata.updatedBy': userId },
      { new: true }
    );
    if (!tradeline) throw new AppError('Tradeline not found', 404, 'NOT_FOUND');
    return tradeline;
  }

  async deleteTradeline(id) {
    const tradeline = await Tradeline.findByIdAndDelete(id);
    if (!tradeline) throw new AppError('Tradeline not found', 404, 'NOT_FOUND');
    return tradeline;
  }

  async decrementSlotOnPlacement(tradelineId) {
    const tradeline = await Tradeline.findOneAndUpdate(
      { _id: tradelineId, availableSlots: { $gt: 0 } },
      { $inc: { availableSlots: -1 } },
      { new: true }
    );
    if (!tradeline) {
      throw new AppError('No available slots for this tradeline', 400, 'NO_SLOTS');
    }
    return tradeline;
  }
}

module.exports = new TradelineService();
