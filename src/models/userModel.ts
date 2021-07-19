import { Schema, model } from 'mongoose';
import { UserSignUp } from '../interfaces/userInterface';
import bcrypt from 'bcrypt';

const userSchema = new Schema<UserSignUp>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'non-binary'],
        message: '{VALUE} is not a gender',
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const UserModel = model('Users', userSchema);

export default UserModel;
