const Joi = require('joi');
const { AppError } = require('./error-handler');

const schemas = {
  userSignup: Joi.object({
    name: Joi.string().required().min(2).max(100),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(100),
  }),

  adminSignup: Joi.object({
    name: Joi.string().required().min(2).max(100),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(100),
    adminSecret: Joi.string().required(),
  }),

  userLogin: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  adminLogin: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  updateUser: Joi.object({
    name: Joi.string().min(2).max(100),
    email: Joi.string().email(),
  }),

  // Tradeline validations
  tradelineCreate: Joi.object({
    bankName: Joi.string().required().min(2).max(100),
    cardAgeMonths: Joi.number().integer().min(1).required(),
    creditLimitMin: Joi.number().min(0).required(),
    creditLimitMax: Joi.number().min(Joi.ref('creditLimitMin')).required(),
    placementFee: Joi.number().min(0).required(),
    totalSlots: Joi.number().integer().min(0).required(),
    availableSlots: Joi.number().integer().min(0).required(),
    status: Joi.string().valid('active', 'inactive').default('active'),
    featured: Joi.boolean().default(false),
  }),

  tradelineUpdate: Joi.object({
    bankName: Joi.string().min(2).max(100),
    cardAgeMonths: Joi.number().integer().min(1),
    creditLimitMin: Joi.number().min(0),
    creditLimitMax: Joi.number().min(Joi.ref('creditLimitMin')),
    placementFee: Joi.number().min(0),
    totalSlots: Joi.number().integer().min(0),
    availableSlots: Joi.number().integer().min(0),
    status: Joi.string().valid('active', 'inactive'),
    featured: Joi.boolean(),
  }).min(1),

  tradelineStatusUpdate: Joi.object({
    status: Joi.string().valid('active', 'inactive').required(),
  }),

  // Request validations
  tradelineRequestCreate: Joi.object({
    tradelineId: Joi.string().required(),
    userInfo: Joi.object({
      fullName: Joi.string().required().min(2).max(120),
      email: Joi.string().email().required(),
      phone: Joi.string().required().min(6).max(30),
      dob: Joi.string().required().min(4).max(30),
      address: Joi.string().allow('', null),
    }).required(),
  }),

  tradelineRequestStatusUpdate: Joi.object({
    status: Joi.string().valid('submitted', 'placed', 'completed').required(),
    adminNotes: Joi.string().allow('', null),
  }),
};

const validate = (data, schemaName) => {
  const schema = schemas[schemaName];
  if (!schema) {
    throw new AppError('Invalid schema name', 500, 'VALIDATION_ERROR');
  }

  const { error, value } = schema.validate(data, { abortEarly: false });

  if (error) {
    const messages = error.details.map((detail) => detail.message).join(', ');
    throw new AppError(messages, 400, 'VALIDATION_ERROR');
  }

  return value;
};

module.exports = { validate, schemas };