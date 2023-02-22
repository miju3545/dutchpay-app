import { FC } from 'react';
import RightPane from '../RightPane';
import LeftPane from '../LeftPane';
import { useGroup } from 'components/group/context';

const ExpenseView: FC = () => {
  const { groupName, members } = useGroup();

  return (
    <div>
      <p>groupName: {groupName}</p>
      <p>members: {members.join(', ')}</p>
      <LeftPane />
      <RightPane />
    </div>
  );
};

export default ExpenseView;
