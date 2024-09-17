import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/router';

export default function User() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`https://dummyjson.com/users/${id}`);   

      setUser(response.data);
    };

    fetchUser();
  }, [id]);

}