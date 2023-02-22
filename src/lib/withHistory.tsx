import { ComponentType, useEffect } from 'react';
import { useGroup, History } from 'components/group/context';
import { useNavigate } from 'react-router-dom';

type Props = {};

const withHistory =
  (url: History) =>
  <P extends Props>(Wrapped: ComponentType<P>) => {
    const Component = (props: P) => {
      const { history } = useGroup();
      const navigate = useNavigate();

      useEffect(() => {
        if (url !== history) navigate(url);
      }, [history, navigate]);

      return <Wrapped {...props} />;
    };

    return Component;
  };

export default withHistory;
