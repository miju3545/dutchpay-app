import { CreateGroupView } from 'components/group';
import withLoggedIn from 'lib/withLoggedIn';
import { FC } from 'react';

const Group: FC = () => {
  return (
    <div>
      <CreateGroupView />
    </div>
  );
};

export default withLoggedIn(Group);
