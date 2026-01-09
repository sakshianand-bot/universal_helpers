const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../auth/middleware');
const requestService = require('../services/request.service');

// List all requests (admin)
router.get('/', authMiddleware(true), async (req, res, next) => {
  try {
    const { status, tradelineId } = req.query;
    const requests = await requestService.listAllRequests({ status, tradelineId });
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    next(error);
  }
});

// Update request status (admin)
router.patch('/:id/status', authMiddleware(true), async (req, res, next) => {
  try {
    const request = await requestService.updateStatus(req.params.id, req.body);
    res.status(200).json({ success: true, data: request });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
