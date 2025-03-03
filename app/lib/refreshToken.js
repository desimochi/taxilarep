import { saveTokens, getRefreshToken, clearTokens } from "./auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function refreshAccessToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    console.error("No refresh token found");
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    const data = await response.json();

    if (response.ok && data.data?.access_token) {
      saveTokens(data.data.access_token, refreshToken);
      return data.data.access_token;
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
