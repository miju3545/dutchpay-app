import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ManagedUIContext } from './components/ui/context';
import Layout from './components/common/Layout';
import { GroupProvider } from './components/group/context';
import Auth from 'pages/auth';
import Index from 'pages';
import Group from 'pages/group';
import Members from 'pages/members';
import Expense from 'pages/expense';

const App = () => {
  return (
    <div className="App">
      <ManagedUIContext>
        <GroupProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" index element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/group" element={<Group />} />
                <Route path="/members" element={<Members />} />
                <Route path="/expense" element={<Expense />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </GroupProvider>
      </ManagedUIContext>
    </div>
  );
};

export default App;
