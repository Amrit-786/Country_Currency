import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useApi from '../hooks/useApi';
import AuthForm from '../components/AuthForm';
import styles from '../components/AuthForm.module.css';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { sendRequest, loading, error } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await sendRequest('/auth/login', 'POST', {email, password});
      login(data.token);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <AuthForm title="Login" onSubmit={handleSubmit} buttonText={loading ? 'Logging in...' : 'Login'}>
      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.inputLabel}>Email</label>
        <input
          id="email"
          type="email"
          className={styles.inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.inputLabel}>Password</label>
        <input
          id="password"
          type="password"
          className={styles.inputField}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </AuthForm>
  );
};

export default LoginPage;