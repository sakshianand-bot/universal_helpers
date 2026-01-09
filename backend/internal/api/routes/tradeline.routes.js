const express = require('express');
const router = express.Router();
const tradelineService = require('../services/tradeline.service');

// Public/user: list only active tradelines with available slots
router.get('/', async (req, res, next) => {
  try {
    const tradelines = await tradelineService.listActiveTradelines();
    res.status(200).json({
      success: true,
      data: tradelines,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
