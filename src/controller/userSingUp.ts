import  { Request, Response, NextFunction } from 'express';
import {  validateSignUp } from '../helpers/userValidator';
import UserModel from '../models/userModel';

export async function signUp(req: Request, res: Response, next: NextFunction) {
	const { error } = validateSignUp(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	try {
		const {
			firstName,
			lastName,
			userName,
			gender,
			email,
			password
		} = req.body;
        
		const inputEmail = await UserModel.findOne({ email });
		if (inputEmail) return res.status(400).send('User already exists');

		const user = await UserModel.create({
			firstName,
			lastName,
			userName,
			gender,
			email,
			password,
		});

		res.status(201).json({
			message: 'User Created Successfully',
			user: user,
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}
