import { ComponentType, useEffect } from 'react';
import useToken from './useToken';
import { useNavigate } from 'react-router-dom';

type Props = {};

const withLoggedIn = <P extends Props>(Wrapped: ComponentType<P>, accept: boolean | undefined = true) => {
  const Component = (props: P) => {
    const { isExist } = useToken();
    const navigate = useNavigate();

    useEffect(() => {
      if (accept) {
        // if (!isExist) navigate('/auth');
      } else {
        // if (isExist) navigate(-1);
      }
    }, [isExist]);

    return <Wrapped {...props} />;
  };

  return Component;
};

export default withLoggedIn;
