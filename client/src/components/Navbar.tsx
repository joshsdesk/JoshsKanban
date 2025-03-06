import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    } else {
      setLoginCheck(false); // Explicitly reset if logged out
    }
  };

  useEffect(() => {
    checkLogin();
  }, [loginCheck]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarTitle}>
        <Link to="/" className={styles.navbarBrand}>JoshsKanban Board</Link>
      </div>
      <ul className={styles.navLinks}>
        {loginCheck && (
          <li className={styles.navItem}>
            <Link to="/create" className={styles.navButton}>New Ticket</Link>
          </li>
        )}

        {!loginCheck ? (
          <li className={styles.navItem}>
            <Link to="/login" className={styles.navButton}>Login</Link>
          </li>
        ) : (
          <li className={styles.navItem}>
            <button
              type="button"
              className={styles.navButton}
              onClick={() => auth.logout()}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
