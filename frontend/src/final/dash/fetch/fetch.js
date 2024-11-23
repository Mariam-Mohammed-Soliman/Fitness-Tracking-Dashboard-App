import { useEffect, useState } from 'react';

const useFetchUsersData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/db.json');
        const data = await response.json();
        // console.log('Fetched data:', data);
        setUsers(data.users);
        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const saveUsersData = (updatedUsers) => {
    localStorage.setItem('users', JSON.stringify(updatedUsers)); // Save to local storage
    setUsers(updatedUsers); // Update state
  };

  return { users, loading, error, saveUsersData };
};

export default useFetchUsersData;
