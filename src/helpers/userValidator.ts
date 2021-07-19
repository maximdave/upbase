import Joi from 'joi';
import { UserSignUp, UserLogin } from '../interfaces/userInterface';

export const validateSignUp = (userSignUp: UserSignUp) => {
  const Schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    userName: Joi.string().min(2).required(),
    gender: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return Schema.validate(userSignUp);
};

export const validateLogin = (userLogin: Record<string, any>) => {
  const schema = Joi.object({
    password: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
  });
  return schema.validate(userLogin);
};
