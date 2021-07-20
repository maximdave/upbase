import { Request, Response, NextFunction } from 'express';
import { validateSignUp } from '../helpers/userValidator';
import UserModel from '../models/userModel';
import bcrypt from 'bcrypt';
import cloudinary from '../helpers/cloudinary';

export async function signUp(req: Request, res: Response, next: NextFunction) {
  const { error } = validateSignUp(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const email = req.body.email;

    //cloudinary image upload
    let result: any = '';
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const newUser = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      gender: req.body.gender,
      email: email,
      password: hashedPassword,
      profile_picture: result.secure_url,
      cloudinary_id: result.public_id,
    });

    const inputEmail = await UserModel.findOne({ email });
    if (inputEmail) return res.status(400).send('User already exists');

    //save user and respond
    const user = await newUser.save();
    res.status(201).json({
      message: 'User Created Successfully',
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
