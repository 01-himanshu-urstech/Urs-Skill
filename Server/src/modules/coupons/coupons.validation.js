import Joi from 'joi';
import { DISCOUNT_TYPES } from '../../constants/discountTypes.js';

export const updateCouponSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string().max(120),
  status: Joi.string().valid('ACTIVE', 'INACTIVE', 'EXPIRED'),
  allowedCustomers: Joi.array().items(Joi.string().email()),
  validFrom: Joi.date(),
  validTill: Joi.date(),
  minCartAmount: Joi.number().min(0),
  totalUsageLimit: Joi.number().min(1),
  perUserUsageLimit: Joi.number().min(1),
  discountType: Joi.string().valid(...Object.values(DISCOUNT_TYPES)),
  discountValue: Joi.number().min(1),
  maxDiscountAmount: Joi.number().min(0)
}).min(1);
