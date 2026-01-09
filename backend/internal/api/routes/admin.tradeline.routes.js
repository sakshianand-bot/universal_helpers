const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../auth/middleware');
const tradelineService = require('../services/tradeline.service');

// Create
router.post('/', authMiddleware(true), async (req, res, next) => {
  try {
    const tradeline = await tradelineService.createTradeline(req.body, req.user.id);
    res.status(201).json({ success: true, data: tradeline });
  } catch (error) {
    next(error);
  }
});

// List all (admin)
router.get('/', authMiddleware(true), async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const tradelines = await tradelineService.listAllTradelines({ status, search });
    res.status(200).json({ success: true, data: tradelines });
  } catch (error) {
    next(error);
  }
});

// Update
router.put('/:id', authMiddleware(true), async (req, res, next) => {
  try {
    const tradeline = await tradelineService.updateTradeline(req.params.id, req.body, req.user.id);
    res.status(200).json({ success: true, data: tradeline });
  } catch (error) {
    next(error);
  }
});

// Update status
router.patch('/:id/status', authMiddleware(true), async (req, res, next) => {
  try {
    const tradeline = await tradelineService.updateTradelineStatus(req.params.id, req.body.status, req.user.id);
    res.status(200).json({ success: true, data: tradeline });
  } catch (error) {
    next(error);
  }
});

// Delete
router.delete('/:id', authMiddleware(true), async (req, res, next) => {
  try {
    const tradeline = await tradelineService.deleteTradeline(req.params.id);
    res.status(200).json({ success: true, data: tradeline });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
