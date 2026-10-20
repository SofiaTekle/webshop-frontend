import type { LoginRequest, TokenResponse, CurrentUser } from "../types/auth";

const API_URL = import.meta.env.VITE_GATEWAY_API_URL;
const TOKEN_KEY = "access_token";
const USER_KEY = "current_user";

export async function login(credentials: LoginRequest): Promise<TokenResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.status}`);
  }
  const data: TokenResponse = await response.json();

  const currentUser: CurrentUser = {
    expiresIn: data.expiresIn,
    subject: data.subject,
    roles: data.roles,
  };

  sessionStorage.setItem(USER_KEY, JSON.stringify(currentUser));

  sessionStorage.setItem(TOKEN_KEY, data.accessToken);

  return data;
}


export function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}
export async function getSession(): Promise<CurrentUser | null>{
  const response = await fetch(
    `${API_URL}/auth/me`,
    {
      credentials: "include",
    }
  );
  if(response.status === 401){
    return null;
  }
  if(!response.ok){
    throw new Error(`Kunde inte kontrollera inloggningen (${response.status})`);
  }
  return response.json();
}

export function isAuthenticated(): boolean {
  return getToken() !== null;
}
export function getCurrentUser(): CurrentUser | null {
  const storedUser = sessionStorage.getItem(USER_KEY);

  if (storedUser === null) {
    return null;
  }

  return JSON.parse(storedUser) as CurrentUser;
}

export function logout(): void {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
}
