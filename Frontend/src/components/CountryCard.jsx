import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import useApi from '../hooks/useApi';
import styles from './CountryCard.module.css';


const CountryCard = ({ country,onFavoriteToggle }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useAuth();
  const { sendRequest } = useApi();

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (user) {
        try {
          const response = await sendRequest(`/api/user/favorites/${country.cca3}`, 'GET', null, {
            Authorization: `Bearer ${user.token}`,
          });
          setIsFavorite(response.isFavorite);
        } catch (err) {
          console.error('Error checking favorite status:', err);
        }
      }
    };

    checkFavoriteStatus();
  }, [user, country.cca3, sendRequest]);

  const toggleFavorite = async () => {
    if (user) {
      try {
        const endpoint = isFavorite ? `/user/favorites/${country.cca3}` : '/user/favorites';
        const method = isFavorite ? 'DELETE' : 'POST';
        await sendRequest(endpoint, method, isFavorite ? null : { countryCode: country.cca3 }, {
          Authorization: `Bearer ${user.token}`,
        });
        setIsFavorite(!isFavorite);
        if (onFavoriteToggle) onFavoriteToggle(country.cca3, !isFavorite);
      } catch (err) {
        console.error('Error toggling favorite:', err);
      }
    }
  };

  return (
    <div className={`${styles.card} ${isFavorite ? styles.favorite : ''}`}>
      <img className={styles.flag} src={`https://flagsapi.com/${country.cca2}/shiny/64.png`} alt={`${country.name.common} flag`} />
      <h2 className={styles.name}>{country.name.common}</h2>
      <p className={styles.info}>Capital: {country.capital?.[0]}</p>
      <p className={styles.info}>Currency: {Object.values(country.currencies)[0].name}</p>
      <p className={styles.info}>Languages: {Object.values(country.languages).join(', ')}</p>
      {user && (
        <button className={styles.favoriteButton} onClick={toggleFavorite}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      )}
    </div>
  );
};

export default CountryCard;