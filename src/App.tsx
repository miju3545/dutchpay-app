import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CreateGroupView, AddMembersView } from './components/group';
import { LoginView, SignUpView } from './components/auth';
import ExpenseView from './components/expense/ExpenseView';
import { ManagedUIContext } from './components/ui/context';
import Layout from './components/common/Layout/Layout';
import Intro from './pages/Intro';

const App = () => {
  return (
    <div className="App">
      <ManagedUIContext>
        <Layout>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Intro />} />
              <Route path="/expense" element={<ExpenseView />} />
              {/* <Route path="/members" element={<AddMembersView />} /> */}
              {/* <Route path="/signup" element={<SignUpView />} /> */}
              {/* <Route path="/login" element={<LoginView />} /> */}
            </Routes>
          </BrowserRouter>
        </Layout>
      </ManagedUIContext>
    </div>
  );
};

export default App;
