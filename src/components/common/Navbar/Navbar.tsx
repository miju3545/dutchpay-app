import { FC } from 'react';
import { useUI } from '../../ui/context';

const Navbar: FC = () => {
  const { openModal, setModalView } = useUI();
  return (
    <div
      onClick={() => {
        setModalView('LOGIN_VIEW');
        openModal();
      }}>
      유저
    </div>
  );
};

export default Navbar;
