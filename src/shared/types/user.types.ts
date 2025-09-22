export interface AuthenticatedUser {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export interface UserRegistration {
  username: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserUpdate {
  email?: string;
  username?: string;
  password?: string;
  bio?: string;
  image?: string;
}
