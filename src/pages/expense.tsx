import ExpenseView from 'components/expense/ExpenseView/ExpenseView';
import { useGroup } from 'components/group/context';
import { GroupLayout } from 'components/common';

const Expense = () => {
  const { groupName, members } = useGroup();

  console.log('useGroups', groupName, members);
  return <ExpenseView />;
};

export default GroupLayout(Expense);
