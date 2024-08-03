import { useState, useRef, useEffect } from 'react';
import useApi from '../hooks/useApi';
import SearchBar from '../components/SearchBar';
import CountryCard from '../components/CountryCard';
import HistorySection from '../components/HistorySection';
import styles from './HomePage.module.css';
import { useAuth } from '../context/AuthContext';


const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const searchInputRef = useRef(null);
  const { sendRequest, loading, error } = useApi();
  const {user} = useAuth();

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const handleSearch = async (currencyCode) => {
    if (!currencyCode) return;
    
    try {
      const data = await sendRequest(`/countries/currency/${currencyCode}`,'GET',null,{
        Authorization:`Bearer ${user.token}`
      });
      setCountries(data);
      
      // Update search history
      setSearchHistory(prevHistory => {
        const newHistory = [currencyCode, ...prevHistory.filter(item => item !== currencyCode)];
        return newHistory.slice(0, 5);  // Keep only the last 5 unique searches
      });
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const sortCountries = (order) => {
    const sortedCountries = [...countries].sort((a, b) => {
      return order === 'asc' 
        ? a.name.common.localeCompare(b.name.common)
        : b.name.common.localeCompare(a.name.common);
    });
    setCountries(sortedCountries);
  };

  return (
    <div className={styles.homePage}>
      <h1 className={styles.title}>Explore Countries by Currency</h1>
      <div className={styles.searchContainer}>
        <SearchBar onSearch={handleSearch} ref={searchInputRef} />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}
      {countries.length > 0 && (
        <div className={styles.sortButtons}>
          <button className={styles.sortButton} onClick={() => sortCountries('asc')}>Sort A-Z</button>
          <button className={styles.sortButton} onClick={() => sortCountries('desc')}>Sort Z-A</button>
        </div>
      )}
      {countries.length > 0 ? (
        <div className={styles.countryList}>
          {countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      ) : (
        <p className={styles.noResults}>No countries found. Try searching for a currency code.</p>
      )}
      <HistorySection history={searchHistory} />
    </div>
  );
};

export default HomePage;
