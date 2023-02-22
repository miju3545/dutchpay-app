import { LoginView } from 'components/auth';
import withLoggedIn from 'lib/hooks/withLoggedIn';
import { FC, useEffect } from 'react';

const Auth: FC = () => {
  return (
    <div>
      <LoginView />
    </div>
  );
};

export default withLoggedIn(Auth, false);
