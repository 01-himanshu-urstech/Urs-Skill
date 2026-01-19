import Joi from 'joi';

export const createContactSchema = Joi.object({
  fullName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).required(),
  message: Joi.string().allow('', null)
});
