import { FC, ReactNode } from 'react';
import { Modal } from '../../ui';
import { useUI } from '../../ui/context';
import { LoginView } from '../../auth';
import SignUpView from '../../auth/SignUpView';
import CreateGroupView from '../../group/CreateGroupView';
import { AddMembersView } from '../../group';
import useAcceptCookies from '../../../lib/hooks/useAcceptCookies';
import Navbar from '../Navbar';

type Props = {
  children?: ReactNode;
};

const ModalView: FC<{ modalView: string; onClose: () => void }> = ({ modalView, onClose }) => {
  return (
    <Modal onClose={onClose}>
      {modalView === 'LOGIN_VIEW' && <LoginView />}
      {modalView === 'SIGNUP_VIEW' && <SignUpView />}
      {modalView === 'CREATEGROUP_VIEW' && <CreateGroupView />}
      {modalView === 'ADDMEMBERS_VIEW' && <AddMembersView />}
    </Modal>
  );
};

const ModalUI: FC = () => {
  const { displayModal, closeModal, modalView } = useUI();
  return displayModal ? <ModalView modalView={modalView} onClose={closeModal} /> : null;
};

const Layout: FC<Props> = ({ children }) => {
  const { acceptedCookies } = useAcceptCookies();

  return (
    <div>
      <Navbar />
      <main>{children}</main>
      {/* <Footer /> */}
      <ModalUI />
      {/* <SidebarUI /> */}
      {/* <FeatureBar
        title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
        hide={acceptedCookies}
        action={
          <Button className="mx-5" onClick={() => onAcceptCookies()}>
            Accept cookies
          </Button>
        }
      /> */}
    </div>
  );
};

export default Layout;
