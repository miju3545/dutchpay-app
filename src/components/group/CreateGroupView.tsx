import { FC, useState, SyntheticEvent, useCallback, useEffect } from 'react';
import { useUI } from '../ui/context';
import { Button } from '../ui';
import Input from '../ui/Input/Input';

const CreateGroupView: FC = () => {
  // form state
  const [groupName, setGroupName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [dirty, setDirty] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const { setModalView } = useUI();

  const handleCreate = async (e: SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    // if (!dirty && disabled) {
    //   handleValidation();
    // }

    try {
      setLoading(true);
      setMessage('');
      // await createGroup({ name });
      setModalView('ADDMEMBERS_VIEW');
    } catch ({ errors }) {
      if (errors instanceof Array) {
        setMessage(errors.map((e: any) => e.message).join('<br />'));
      } else {
        setMessage('Unexpected Error');
      }
      setDisabled(false);
    } finally {
      setLoading(false);
    }
  };

  const handleValidation = useCallback(() => {
    const validName = /\w{3,}/.test(groupName);

    if (dirty) {
      setDisabled(!validName);
    }
  }, [groupName, dirty]);

  useEffect(() => {
    handleValidation();
  }, [handleValidation, groupName, dirty]);

  useEffect(() => {
    if (groupName.length) setDirty(true);
  }, [groupName]);

  return (
    <div>
      CreateGroupView
      <form onSubmit={handleCreate}>
        <Input value={groupName} onChange={(e) => setGroupName(e.target.value)} />
        <Button type="submit" loading={loading} disabled={disabled}>
          Save Group Name.
        </Button>
      </form>
    </div>
  );
};

export default CreateGroupView;
