import { saveTokens, getRefreshToken, clearTokens } from "./auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function refreshAccessToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    console.error("No refresh token found");
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}token/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh : refreshToken }),
    });

    const data = await response.json();

    if (response.ok && data.access) {
      saveTokens(data.access, refreshToken);
      return data.access;
    } else {
      console.error("Failed to refresh token", data);
      clearTokens();
      return null;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    clearTokens();
    return null;
  }
}
