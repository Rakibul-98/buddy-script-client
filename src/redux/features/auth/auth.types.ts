export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}
