import { getAccessToken, clearTokens } from "./auth";
import { getCookie } from "./getCSRF";
import { refreshAccessToken } from "./refreshToken";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function authFetch(endpoint, options = {}) {
  let token = getAccessToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    console.warn("Access token expired, refreshing...");
    token = await refreshAccessToken();

    if (token) {
      headers.Authorization = `Bearer ${token}`;
      response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });
    } else {
      console.error("Session expired. Logging out...");
      clearTokens();
      window.location.href = "/login";
      return;
    }
  }

  return response;
}
