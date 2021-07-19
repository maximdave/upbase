import  {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel';

export const userAuthentication = async (req:Request | any, res:Response, next:NextFunction) =>{
	if(req.headers.authorization){
		const token = req.headers.authorization.split(' ')[1];
		try{
			const decodedToken: string | any = await jwt.verify(token, process.env.JWT_SECRET_KEY as string);
			const user = await UserModel.findById({_id: decodedToken.id});
			if(!user){
				return res.status(400).json('no token provided');
			}else{
				req.user = user;
			}
		}catch(err){
			return res.status(400).json({'error':err});
		}
        
        
	}else{
		return res.status(400).json('not Authorized');
	}
	next();

};


