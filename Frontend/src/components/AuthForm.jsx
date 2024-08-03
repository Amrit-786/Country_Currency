import styles from './AuthForm.module.css';

const AuthForm = ({ title, onSubmit, buttonText, children }) => {
  return (
    <div className={styles.authContainer}>
      <form className={styles.authForm} onSubmit={onSubmit}>
        <h2 className={styles.authTitle}>{title}</h2>
        {children}
        <button type="submit" className={styles.authButton}>
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;