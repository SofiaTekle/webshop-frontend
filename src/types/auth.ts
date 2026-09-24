export type Role = "ROLE_ADMIN" | "ROLE_USER";

export type LoginRequest = {
  email: string;
  password: string;
};

export type TokenResponse = {
  accessToken: string;
  expiresIn: number;
  subject: string;
  roles: Role[];
};
export type CurrentUser = {
  email: string;
  roles: Role[];
};
