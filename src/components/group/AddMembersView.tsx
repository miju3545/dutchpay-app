import { FC, useState, SyntheticEvent } from 'react';
import { useUI } from '../ui/context';
import { Button } from '../ui';

const AddMembersView: FC = () => {
  // form state
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [dirty, setDirty] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { setModalView, closeModal } = useUI();

  const handleAdd = (e: SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    // setModalView('EXPENSE_VIEW');
  };

  return (
    <div>
      AddMembersView
      <form onSubmit={handleAdd}>
        <Button type="submit" loading={loading} disabled={disabled}>
          Add!!
        </Button>
      </form>
    </div>
  );
};

export default AddMembersView;
