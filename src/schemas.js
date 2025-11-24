import Joi from 'joi';

const userSchema = Joi.object({
  id: Joi.string().uuid(),
  name: Joi.string().min(3).required({ message: 'Name is required' }),
  username: Joi.string().min(3).required({ message: 'Username is required' }),
  password: Joi.string().min(3).required({ message: 'Password is required' })
});

const idSchema = Joi.string().uuid().required();

const queryParamsSchema = Joi.object({
  page: Joi.number().min(1).optional(),
  size: Joi.number().min(1).optional(),
  filter: Joi.string().allow('').optional()
});

const userArraySchema = Joi.array().items(userSchema);

export { userSchema, idSchema, queryParamsSchema, userArraySchema };
