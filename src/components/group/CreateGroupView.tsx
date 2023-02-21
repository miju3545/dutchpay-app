import { FC, useState, SyntheticEvent, useCallback, useEffect } from 'react';
import { useUI } from '../ui/context';
import { Button } from '../ui';
import Input from '../ui/Input/Input';
import GroupLayout from '../common/GroupLayout';
import { useGroup } from './context';
import useInput from '../../lib/hooks/useInput';

const CreateGroupView: FC = () => {
  const { ref, value: groupName, onChange: onChangeGroupName, isDirty: isGroupNameDirty } = useInput('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const { setModalView } = useUI();
  const { saveGroupName } = useGroup();

  const handleCreate = async (e: SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage('');

      saveGroupName(groupName);
      setModalView('ADDMEMBERS_VIEW');
    } catch ({ errors }: any) {
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
    const validName = !!groupName.length;

    if (isGroupNameDirty) {
      setDisabled(!validName);
    }
  }, [groupName, isGroupNameDirty]);

  useEffect(() => {
    handleValidation();
  }, [handleValidation]);

  return (
    <div>
      <h1>먼저, 더치 페이 할 그룹을 만들어 주세요.</h1>
      <form onSubmit={handleCreate}>
        <Input ref={ref} value={groupName} onChange={onChangeGroupName} placeholder="2023 부산 여행" />
        <Button type="submit" loading={loading} disabled={disabled}>
          저장
        </Button>
      </form>
    </div>
  );
};

export default GroupLayout(CreateGroupView);
