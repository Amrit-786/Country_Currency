import { useState, useCallback } from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../config'



const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (endpoint, method = 'GET', body = null, headers = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        url : `${API_BASE_URL}${endpoint}`,
        method,
        data: body,
        headers:{
          ...headers,
          'Content-Type': 'application/json',
        }
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!');
      setLoading(false);
      throw err;
    }
  }, []);

  return { sendRequest, loading, error };
};

export default useApi;