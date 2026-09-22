export type Roles = "ROLE_ADMIN" | "ROLE_USER"

export type LoginRequest = {
    username: string;
    password: string;
};

export type TokenResponse = {
    accessToken: string;
    expiresIn: number;
    subject: string;
    roles: Roles;
}