import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import AuthForm from '../components/AuthForm';
import styles from '../components/AuthForm.module.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { sendRequest, loading} = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      await sendRequest('/auth/register', 'POST', { email, password });
      setSuccessMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1000);
    }
     catch (err) {
      console.error('Registration failed:' + err.message);
    }
  };

  return (
    <AuthForm title="Register" onSubmit={handleSubmit} buttonText={loading ? 'Registering...' : 'Register'}>
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
      <div className={styles.inputGroup}>
        <label htmlFor="confirmPassword" className={styles.inputLabel}>Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          className={styles.inputField}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </AuthForm>
  );
};

export default RegisterPage;