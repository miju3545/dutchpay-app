import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CreateGroupView, AddMembersView } from './components/group';
import { LoginView, SignUpView } from './components/auth';
import ExpenseView from './components/expense/ExpenseView';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateGroupView />} />
          <Route path="/members" element={<AddMembersView />} />
          <Route path="/expense" element={<ExpenseView />} />
          <Route path="/signup" element={<SignUpView />} />
          <Route path="/login" element={<LoginView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
