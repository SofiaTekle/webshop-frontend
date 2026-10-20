export type Role = "ROLE_ADMIN" | "ROLE_USER";

export type LoginRequest = {
  email: string;
  password: string;
};

export type TokenResponse = {
  expiresIn?: number;
  subject: string;
  roles: Role[];
};
export type CurrentUser = {
  expiresIn?: number;
  subject: string;
  roles: Role[];
};
