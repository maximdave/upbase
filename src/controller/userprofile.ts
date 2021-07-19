import { Request, Response } from 'express';
import UserModel from '../models/userModel';
import { validateProfileUpdate } from '../helpers/profileValidator';

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const singleData = await UserModel.findById(req.params.id).select(
      '_id firstName lastName dateOfBirth country gender'
    );
    return res.status(200).json(singleData);
  } catch (error) {
    res.status(404).json({ message: 'Error getting single data' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const data = await UserModel.find({});
    if (!data) {
      res.status(404).json({ message: 'Error getting all user data' });
    }
    return res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: 'internal server error' });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Cannot update empty data' });
  }
  try {
    const check = validateProfileUpdate(req.body);
    if (check.error) {
      res.status(400).send(check.error.details[0].message);
    }
    const sid = req.params.id;
    const data = await UserModel.findByIdAndUpdate(
      sid,
      req.body,
      { useFindAndModify: false },
      (error, docs) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Updated User Profile');
        }
      }
    ).exec();
    return res.status(200).json({ message: 'Updated successfully' });
  } catch (error) {
    return res.status(404).json({ message: 'Error updating data' });
  }
};
