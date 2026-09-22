import type { LoginRequest, TokenResponse } from "../types/auth";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const TOKEN_KEY = "access_token";

export async function login(credentials: LoginRequest): Promise<TokenResponse>{

    const response = await fetch(`${API_BASE}/auth/login`,{
        method: "POST",
        headers: {
            "Content-type": "application/json"
    },
    body: JSON.stringify(credentials)
    });

    if(!response.ok){
        throw new Error(`Login failed: ${response.status}`);
    }
    const data: TokenResponse = await response.json();

    sessionStorage.setItem(TOKEN_KEY, data.accessToken)

    return data;



}