import { useState, ChangeEvent, useRef, MutableRefObject, useEffect } from 'react';

const useInput = (
  initialValue: string
): {
  ref: MutableRefObject<HTMLInputElement>;
  value: string;
  isDirty: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  onFocus: () => void;
} => {
  const ref = useRef() as MutableRefObject<HTMLInputElement>;
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);

  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onReset = () => setValue(initialValue);

  const onFocus = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  useEffect(() => {
    setDirty(!!value.length);
  }, [value]);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);

  return { ref, value, isDirty, onChange: handler, onReset, onFocus };
};

export default useInput;
