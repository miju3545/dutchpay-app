import ExpenseView from 'components/expense/ExpenseView/ExpenseView';
import { useGroup } from 'components/group/context';
import compose from 'lib/compose';
import withLoggedIn from 'lib/withLoggedIn';
import withHistory from '../lib/withHistory';

const Expense = () => {
  return (
    <div>
      <ExpenseView />;
    </div>
  );
};

export default compose(withLoggedIn, withHistory('/members'))(Expense);
