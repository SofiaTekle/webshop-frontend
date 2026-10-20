import type { LoginRequest, TokenResponse, CurrentUser } from "../types/auth";

const API_URL = import.meta.env.VITE_GATEWAY_API_URL;

export async function login(credentials: LoginRequest): Promise<CurrentUser> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
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

  if (!response.ok) {
    throw new Error(`Logout failed: ${response.status}`);
  }
}




