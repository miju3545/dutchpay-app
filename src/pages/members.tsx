import { AddMembersView } from 'components/group';
import withLoggedIn from 'lib/withLoggedIn';
import { FC } from 'react';

const Member: FC = () => {
  return (
    <div>
      <AddMembersView />
    </div>
  );
};

export default withLoggedIn(Member);
