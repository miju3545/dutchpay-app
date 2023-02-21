import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const COOKIE_NAME = 'accept_cookies';

const useAcceptCookies = (): { acceptedCookies: boolean; onAcceptCookies: () => void } => {
  const [acceptedCookies, setAcceptedCookies] = useState(true);

  const acceptCookies = () => {
    setAcceptedCookies(true);
    Cookies.set(COOKIE_NAME, 'accepted', { expires: 365 });
  };

  useEffect(() => {
    if (!Cookies.get(COOKIE_NAME)) {
      setAcceptedCookies(false);
    }
  });

  return {
    acceptedCookies,
    onAcceptCookies: acceptCookies,
  };
};

export default useAcceptCookies;
