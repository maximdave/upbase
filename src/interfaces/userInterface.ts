export interface UserSignUp {
  firstName: string;
  lastName: string;
  userName: string;
  gender: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
