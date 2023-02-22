import { ComponentType, FC, ReactNode } from 'react';
import { GroupProvider } from '../../group/context';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    // <GroupProvider>
    <div style={{ minWidth: '500px', border: '1px solid #dfdfdf' }}>
      <div>{children}</div>
    </div>
    // </GroupProvider>
  );
};

type Props = {};

const GroupLayout = <T extends Props>(Wrapped: ComponentType<T>) => {
  return (props: T) => {
    return (
      <Layout>
        <Wrapped {...props} />
      </Layout>
    );
  };
};

export default GroupLayout;
