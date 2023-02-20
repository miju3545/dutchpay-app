import { FC } from 'react';
import RightPane from '../RightPane';
import LeftPane from '../LeftPane';

const ExpenseView: FC = () => {
  return (
    <div>
      <LeftPane />
      <RightPane />
    </div>
  );
};

export default ExpenseView;
