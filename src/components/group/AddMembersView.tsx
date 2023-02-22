import { FC, useState, useEffect, useCallback, KeyboardEvent, memo } from 'react';
import { useUI } from '@components/ui/context';
import { Button } from '@components/ui';
import Input from '@components/ui/Input/Input';
import { useGroup } from './context';
import GroupLayout from '@components/common/GroupLayout';
import useUniqueMembers from '@lib/hooks/useUniqueMembers';

const Tag: FC<{ value: string; onRemove: () => void }> = memo(({ value, onRemove }) => {
  return (
    <li>
      {value}
      <button onClick={onRemove}>x</button>
    </li>
  );
});

const AddMembersView: FC = () => {
  const {
    ref,
    current,
    total,
    onChange: onChangeCurrent,
    onAppend,
    onRemove,
    onResetCurrent,
    onResetTotal,
    duplicateError,
  } = useUniqueMembers();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(false);
  const { setModalView } = useUI();
  const { groupName, addMembers } = useGroup();

  const handleAdd = () => {
    onAppend(current);
    onResetCurrent();
  };

  const handleValidation = useCallback(() => {
    setDisabled(duplicateError);

    try {
      setLoading(true);

      addMembers(total);
    } catch ({ error }: any) {
    } finally {
      setLoading(false);
    }
  }, [current]);

  useEffect(() => {
    handleValidation();
  }, [handleValidation]);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div>
      <h1>그룹에 속한 맴버들을 모두 초대해주세요.</h1>
      <div>
        <Input
          ref={ref}
          value={current}
          onChange={onChangeCurrent}
          placeholder="맴버 찾기"
          onKeyPress={handleKeyPress}
        />
        <Button disabled={disabled}>추가하기</Button>
        <ul>
          {total.map((member, i) => (
            <Tag
              key={i}
              value={member}
              onRemove={() => {
                console.log(i);
                onRemove(i);
              }}
            />
          ))}
        </ul>
        <button onClick={onResetTotal}>모두 지우기</button>
        <Button type="button" loading={loading}>
          {total.length}명 초대하기
        </Button>
      </div>
    </div>
  );
};

export default GroupLayout(AddMembersView);
