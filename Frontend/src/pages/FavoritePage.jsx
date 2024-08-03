import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import useApi from '../hooks/useApi';
import CountryCard from '../components/CountryCard';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();
  const { sendRequest, loading, error } = useApi();
 

  useEffect(() => {
    const fetchFavorites = async () => {
        try {
          const data = await sendRequest('/api/user/favorites', 'GET', null, {
            Authorization: `Bearer ${user.token}`,
          });
          setFavorites(data);
        } 
        catch (err) {
          console.error('Error fetching favorites:', err);
        }   
    };
    if (user) {
         fetchFavorites();
    }
  }, [user, sendRequest]);

  return (
    <div className="favorites-page">
      <h1>Your Favorite Countries</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {favorites.length > 0 ? (
        <div className="country-list">
          {favorites.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      ) : (
        <p>You haven't added any favorites yet.</p>
      )}
    </div>
  );
};

export default FavoritesPage;