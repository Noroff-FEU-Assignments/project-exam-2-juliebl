import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants/api';

export function getStrapiURL(path = '') {
  return BASE_URL + path;
}

export function getData(path) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = getStrapiURL(path);

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setLoading(false);
        setData(response.data);
      })
      .catch((error) => {
        setError(error.toString());
        console.log(error);
      });
  }, []);

  return { data, loading, error };
}
