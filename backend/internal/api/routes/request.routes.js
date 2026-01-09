const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../auth/middleware');
const requestService = require('../services/request.service');

// Create request (user)
router.post('/', authMiddleware(false), async (req, res, next) => {
  try {
    const request = await requestService.createRequest(req.body, req.user.id);
    res.status(201).json({ success: true, data: request });
  } catch (error) {
    next(error);
  }
});

// List my requests
router.get('/me', authMiddleware(false), async (req, res, next) => {
  try {
    const requests = await requestService.listUserRequests(req.user.id);
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
