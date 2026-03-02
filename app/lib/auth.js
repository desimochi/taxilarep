export function getAccessToken() {
    return localStorage.getItem("accessToken");
  }
  
  export function getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }
  
  export function saveTokens(accessToken, refreshToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }
  
  export function clearTokens() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
  export function savePermission(permission){
    localStorage.setItem("permission", permission)
  }

  export function getPermission(permission){
    return localStorage.getItem("permission");
  }