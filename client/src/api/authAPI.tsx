import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (!response.ok) {
      // Prefer to show server message if available
      throw new Error(data.message || "User information not retrieved, check network tab!");
    }

    // ✅ Store token in localStorage for future authenticated requests
    if (data.token) {
      localStorage.setItem('jwt_token', data.token);
    }

    // ✅ Return a clear success object
    return {
      success: true,
      token: data.token
    };
  } catch (err: any) {
    console.log('Error from user login:', err.message || err);

    // ✅ Return consistent error object
    return {
      success: false,
      message: err.message || 'Could not fetch user info'
    };
  }
};

export { login };
