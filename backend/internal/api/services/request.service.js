const mongoose = require('mongoose');
const Tradeline = require('../../database/models/Tradeline');
const TradelineRequest = require('../../database/models/TradelineRequest');
const tradelineService = require('./tradeline.service');
const { validate } = require('../../common/validation');
const { AppError } = require('../../common/error-handler');
const { logger } = require('../../common/logger');

const allowedTransitions = {
  pending: ['submitted', 'placed'],
  submitted: ['placed', 'completed'],
  placed: ['completed'],
  completed: [],
};

class RequestService {
  async createRequest(data, userId) {
    const payload = validate(data, 'tradelineRequestCreate');
    const { tradelineId, userInfo } = payload;

    const tradeline = await Tradeline.findById(tradelineId);
    if (!tradeline) throw new AppError('Tradeline not found', 404, 'NOT_FOUND');
    if (tradeline.status !== 'active' || tradeline.availableSlots <= 0) {
      throw new AppError('Tradeline is not available', 400, 'UNAVAILABLE');
    }

    const amount = tradeline.placementFee;

    const request = await TradelineRequest.create({
      user: userId,
      tradeline: tradelineId,
      status: 'pending',
      amount,
      paymentStatus: 'unpaid',
      userInfo,
    });

    logger.info('Tradeline request created', { requestId: request.id, userId, tradelineId });
    return request;
  }

  async listUserRequests(userId) {
    return TradelineRequest.find({ user: userId }).sort({ createdAt: -1 }).populate('tradeline');
  }

  async listAllRequests(filters = {}) {
    const query = {};
    if (filters.status) query.status = filters.status;
    if (filters.tradelineId && mongoose.Types.ObjectId.isValid(filters.tradelineId)) {
      query.tradeline = filters.tradelineId;
    }

    return TradelineRequest.find(query)
      .sort({ createdAt: -1 })
      .populate('tradeline')
      .populate('user', 'name email');
  }

  async updateStatus(requestId, data) {
    const payload = validate(data, 'tradelineRequestStatusUpdate');
    const { status, adminNotes } = payload;

    const request = await TradelineRequest.findById(requestId);
    if (!request) throw new AppError('Request not found', 404, 'NOT_FOUND');

    const allowed = allowedTransitions[request.status] || [];
    if (!allowed.includes(status)) {
      throw new AppError(`Invalid status transition from ${request.status} to ${status}`, 400, 'INVALID_STATUS');
    }

    // On placement, decrement slot atomically
    if (status === 'placed') {
      await tradelineService.decrementSlotOnPlacement(request.tradeline);
    }

    request.status = status;
    if (adminNotes !== undefined) request.adminNotes = adminNotes;
    await request.save();

    logger.info('Tradeline request status updated', { requestId, from: request.status, to: status });
    return request;
  }
}

module.exports = new RequestService();
