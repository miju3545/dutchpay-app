import { useState, ChangeEvent, useMemo, MutableRefObject, useRef, useEffect, useCallback } from 'react';

const useUniqueMembers = (): {
  ref: MutableRefObject<HTMLInputElement>;
  current: string;
  total: string[];
  isDirty: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAppend: (value: string) => void;
  onRemove: (index: number) => void;
  onResetCurrent: () => void;
  onResetTotal: () => void;
  duplicateError: boolean;
} => {
  const ref = useRef() as MutableRefObject<HTMLInputElement>;
  const [current, setCurrent] = useState('');
  const [isDirty, setDirty] = useState(false);
  const [duplicateError, setDuplicateError] = useState(false);

  const [_total, setTotal] = useState<string[]>([]);
  const total = useMemo(() => _total, [_total]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrent(e.target.value);
  };

  const onAppend = useCallback(
    (value: string) => {
      const isDuplicated = total.indexOf(value) > -1;

      if (isDuplicated) {
        setDuplicateError(isDuplicated);
      } else {
        setTotal((arr) => [...arr, value]);
      }
    },
    [total, current]
  );

  const onRemove = useCallback(
    (index: number) => {
      setTotal((total) =>
        total.filter((v, i) => {
          return index !== i;
        })
      );
    },
    [total]
  );

  const onResetCurrent = () => setCurrent('');
  const onResetTotal = () => setTotal([]);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);

  useEffect(() => {
    setDirty(current.length > 0);
  }, [current]);

  useEffect(() => {
    setDuplicateError(isDirty);
  }, [isDirty]);

  return { ref, current, isDirty, total, onChange, onAppend, onRemove, onResetCurrent, onResetTotal, duplicateError };
};

export default useUniqueMembers;
