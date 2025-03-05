import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // ✅ Safely decode token with try/catch
    try {
      const token = this.getToken();
      if (!token) return null;
      return jwtDecode<JwtPayload & { username: string }>(token);
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }
  }

  loggedIn() {
    // ✅ Same logic - checks if token exists and isn't expired
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    // ✅ Assume expired if decoding fails
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded?.exp && decoded.exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error decoding token:', err);
      return true;  // Safer to assume expired if decode fails
    }
  }

  getToken(): string {
    // ✅ Use `jwt_token` instead of `id_token`
    return localStorage.getItem("jwt_token") || "";
  }

  login(idToken: string) {
    // ✅ Store token under `jwt_token`
    localStorage.setItem("jwt_token", idToken);
    // ✅ Redirect to the main page
    window.location.assign("/");
  }

  logout() {
    // ✅ Clear `jwt_token`
    localStorage.removeItem("jwt_token");
    // ✅ Redirect to login page
    window.location.assign("/login");
  }
}

export default new AuthService();
