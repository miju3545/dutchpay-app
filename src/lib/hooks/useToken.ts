import { useState, useEffect } from 'react';

const ACCESS_TOKEN = 'access_token';

const useToken = (): {
  token: string;
  saveToken: (value: string) => void;
  clearToken: () => void;
  isExist: boolean;
} => {
  const [token, setToken] = useState('');
  const [isExist, setExist] = useState(false);

  const saveToken = (value: string) => {
    localStorage.setItem(ACCESS_TOKEN, value);
  };

  const clearToken = () => {
    localStorage.removeItem(ACCESS_TOKEN);
  };

  useEffect(() => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      setToken('');
    }
  });

  useEffect(() => {
    setExist(!!token);
  }, [token]);

  return { token, saveToken, clearToken, isExist };
};

export default useToken;
