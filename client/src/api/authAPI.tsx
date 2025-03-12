import { UserLogin } from "../interfaces/UserLogin";

// ✅ Login function to authenticate user and store JWT
const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/login', {  // ✅ Fixed endpoint to match backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (!response.ok) {
      // ✅ Prefer server message if provided
      throw new Error(data.message || "User information not retrieved, check network tab!");
    }

    // ✅ Store JWT token in localStorage for future use
    if (data.token) {
      localStorage.setItem('jwt_token', data.token);
    }

    // ✅ Return a clear success object
    return {
      success: true,
      token: data.token
    };
  } catch (err: any) {
    console.error('Error from user login:', err.message || err);

    // ✅ Return consistent error object
    return {
      success: false,
      message: err.message || 'Could not fetch user info'
    };
  }
};

export { login };
