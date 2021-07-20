import { Request, Response } from 'express';
import UserModel from '../models/userModel';
import { validateProfileUpdate } from '../helpers/profileValidator';
import cloudinary from '../helpers/cloudinary';

/**
 * Get A Single User Profile.
 */
export const singleUserProfile = async (req: Request, res: Response) => {
  try {
    const singleUser = await UserModel.findById(req.params.id).select(
      '_id firstName lastName userName email gender profile_picture '
    );
    return res.status(200).json(singleUser);
  } catch (error) {
    res.status(404).json({ message: 'Error getting single data' });
  }
};

/**
 * Get All User Profiles.
 */

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const data = await UserModel.find({}).select(
      '_id firstName lastName userName email gender profile_picture '
    );
    if (!data) {
      res.status(404).json({ message: 'Error getting all user data' });
    }
    return res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: 'internal server error' });
  }
};

/**
 * Update User Profile.
 */

export const updateUserProfile = async (req: Request, res: Response) => {
  const { error } = validateProfileUpdate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const user = await UserModel.findById(req.params.id);

    let result: any = '';
    if (req.file) {
      //Delete current image
      await cloudinary.uploader.destroy(user.cloudinary_id);
      //upload new image
      result = await cloudinary.uploader.upload(req.file.path);
    }

    const user_id = req.params.id;

    const newData = {
      firstName: req.body.firstName || user.firstName,
      lastName: req.body.lastName || user.lastName,
      userName: req.body.userName || user.userName,
      gender: req.body.gender || user.gender,
      profile_picture: result.secure_url || user.profile_picture,
      cloudinary_id: result.public_id || user.cloudinary_id,
    };
    const data = await UserModel.findByIdAndUpdate(user_id, newData, {
      new: true,
    }).exec();
    return res
      .status(200)
      .json({ message: 'Updated successfully', data: data });
  } catch (error) {
    return res
      .status(404)
      .json({ message: 'Error updating data, please check User_ID' });
  }
};

/**
 * Delete User Profile.
 */

export const deleteUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);
    await cloudinary.uploader.destroy(user.cloudinary_id);
    await UserModel.remove();
    res.status(200).json('Account has been deleted Successfully');
  } catch (err) {
    return res.status(500).json(err);
  }
};
