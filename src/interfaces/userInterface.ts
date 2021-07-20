export interface UserSignUp {
  firstName: string;
  lastName: string;
  userName: string;
  gender: string;
  email: string;
  password: string;
  profile_picture?: string;
  cloudinary_id?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
