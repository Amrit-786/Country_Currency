import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Header.module.css';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/" className={styles.navLink}>Home</Link>
          </li>
          {user ? (
            <>
              <li className={styles.navItem}>
                <Link to="/favorites" className={styles.navLink}>Favorites</Link>
              </li>
              <li className={styles.navItem}>
                <button onClick={logout} className={styles.logoutButton}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className={styles.navItem}>
                <Link to="/login" className={styles.navLink}>Login</Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/register" className={styles.navLink}>Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;