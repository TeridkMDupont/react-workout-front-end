import { useContext } from 'react';
import { Link } from 'react-router';
import styles from './NavBar.module.css'

import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className={styles.nav}>
      {user ? (
        <ul className={styles.navLinks}>
          <li className={styles.welcome}>Welcome, {user.username}</li>
          <li><Link to='/'>Dashboard</Link></li>
          <li><Link to='/workouts'>Community Page</Link></li>
          <li><Link to='/workouts/new'>Create a Workout</Link></li>
          <li><Link to='/exercises/new'>Submit an Exercise</Link></li>
          <li><Link to='/' onClick={handleSignOut} className={styles.signOut}>Sign Out</Link></li>
        </ul>
      ) : (
        <ul className={styles.navLinks}>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/sign-in'>Sign In</Link></li>
          <li><Link to='/sign-up'>Sign Up</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
