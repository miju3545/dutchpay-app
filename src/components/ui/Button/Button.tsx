import { ButtonHTMLAttributes, FC, JSXElementConstructor, forwardRef, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  className?: string;
  active?: boolean;
  type?: 'submit' | 'reset' | 'button';
  Component?: string | JSXElementConstructor<any>;
  width?: string | number;
  loading?: boolean;
  disabled?: boolean;
};

const Button: FC<Props> = forwardRef((props, buttonRef) => {
  const {
    className,
    children,
    active,
    width,
    loading = false,
    disabled = false,
    style = {},
    Component = 'button',
    ...rest
  } = props;

  const ref = useRef<typeof Component>(null);

  return (
    <Component
      aria-pressed={active}
      ref={mergeRefs([buttonRef, ref])}
      className={className}
      disabled={disabled}
      style={{ width, ...style }}
      {...rest}>
      {children}
      {loading && <div>로딩중...</div>}
    </Component>
  );
});

export default Button;
