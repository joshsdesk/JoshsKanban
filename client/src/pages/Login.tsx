import { useState, FormEvent, ChangeEvent } from "react";
import Auth from '../utils/auth';
import { login } from "../api/authAPI";
import styles from '../styles/Login.module.css';

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const result = await login(loginData);

      if (result.success) {
        Auth.login(result.token);  // Redirect handled inside AuthService
      } else {
        setErrorMessage(result.message || 'Invalid username or password.');
      }
    } catch (err) {
      console.error('Failed to login', err);

      if (err instanceof Error && err.message.includes('Network Error')) {
        setErrorMessage('Cannot connect to server. Please check your connection and try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);

      // Optional: Clear error after 5 seconds for better UX (can be removed if unwanted)
      if (errorMessage) {
        setTimeout(() => setErrorMessage(''), 5000);
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h1 className={styles.formTitle}>Login</h1>

        <label className={styles.formLabel}>Username</label>
        <input
          type='text'
          name='username'
          value={loginData.username}
          onChange={handleChange}
          className={styles.formInput}
        />

        <label className={styles.formLabel}>Password</label>
        <input
          type='password'
          name='password'
          value={loginData.password}
          onChange={handleChange}
          className={styles.formInput}
        />

        <button type='submit' className={styles.submitButton} disabled={loading}>
          {loading ? 'Logging in...' : 'Submit Form'}
        </button>

        {errorMessage && (
          <p className={styles.errorMessage}>
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
