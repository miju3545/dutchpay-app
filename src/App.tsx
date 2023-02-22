import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CreateGroupView, AddMembersView } from './components/group';
import { ManagedUIContext } from './components/ui/context';
import Layout from './components/common/Layout';
import Expense from './pages/expense';
import { GroupProvider } from './components/group/context';
import Auth from 'pages/auth';

const App = () => {
  return (
    <div className="App">
      <ManagedUIContext>
        <GroupProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" index element={<CreateGroupView />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/groups" element={<CreateGroupView />} />
                <Route path="/members" element={<AddMembersView />} />
                <Route path="/expense" element={<Expense />} />
                {/* <Route path="/members" element={<AddMembersView />} /> */}
              </Routes>
            </Layout>
          </BrowserRouter>
        </GroupProvider>
      </ManagedUIContext>
    </div>
  );
};

export default App;
