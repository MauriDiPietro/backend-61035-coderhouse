export interface UserI {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  password: string;
  role?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface RequestUser extends Request {
  user: {
    first_name: string;
    last_name: string;
    role?: string;
  };
}
