import Joi from 'joi';
import { UserSignUp } from '../interfaces/userInterface';

export const validateProfileUpdate = (userSignUp: UserSignUp) => {
  const Schema = Joi.object({
    firstName: Joi.string().min(2),
    lastName: Joi.string().min(2),
    userName: Joi.string().min(2),
    gender: Joi.string(),
    profile_picture: Joi.string(),
    cloudinary_id: Joi.string(),
  });
  return Schema.validate(userSignUp);
};