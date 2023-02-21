import { FC, InputHTMLAttributes, forwardRef } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  onChange?: (...args: any[]) => void;
};

const Input = forwardRef<HTMLInputElement, Props>((props, inputRef) => {
  const { className, children, onChange, ...rest } = props;

  return (
    <label>
      <input
        ref={inputRef}
        className={className}
        onChange={onChange}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...rest}
      />
    </label>
  );
});

export default Input;
