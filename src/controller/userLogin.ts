import { Request, Response, NextFunction } from 'express';
import { validateLogin } from '../helpers/userValidator';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel';
import bcrypt from 'bcrypt';

export async function signIn(req: Request, res: Response, next: NextFunction) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const { error } = validateLogin(req.body as object);
    if (error) {
      return res.status(400).send(error.message);
    }

    const user: any = await UserModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid emaill or password');

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send('Invalid emaill or password');

    const token = jwt.sign(
      {
        user,
      },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: '3h' }
    );

    res.status(200).json({
      token,
      status: 'success',
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        gender: user.gender,
        _id: user._id,
      },
    });
  } catch (error) {
    res.status(500).send({ message: 'Error sigining you in' });
  }
}
