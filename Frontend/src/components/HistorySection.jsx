import styles from './HistorySection.module.css';

const HistorySection = ({ history }) => {
  return (
    <div className={styles.historySection}>
      <h2 className={styles.title}>Search History</h2>
      {history.length > 0 ? (
        <ul className={styles.list}>
          {history.map((item, index) => (
            <li key={index} className={styles.item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className={styles.noHistory}>No search history available.</p>
      )}
    </div>
  );
};

export default HistorySection;