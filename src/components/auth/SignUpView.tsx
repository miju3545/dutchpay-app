import { FC, useState, useEffect, useCallback, SyntheticEvent, useRef, MutableRefObject } from 'react';
import { useUI } from '../ui/context';
import Input from '../ui/Input/Input';
import useInput from '../../lib/hooks/useInput';
import { Button } from '../ui';

const SignUpView: FC = () => {
  const root = useRef() as MutableRefObject<HTMLFormElement>;
  const {
    ref: emailRef,
    value: email,
    onChange: onEmailChange,
    onReset: onEmailReset,
    onFocus: onEmailFocus,
  } = useInput('');
  const { value: password, onChange: onPasswordChange, onReset: onPasswordReset } = useInput('');
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { setModalView, closeModal } = useUI();

  const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage('');

      console.log({ email, password });
      onEmailReset();
      onPasswordReset();
    } catch ({ errors }: any) {
      if (errors instanceof Array) {
        setMessage(errors.map((e: any) => e.message).join('<br />'));
      } else {
        setMessage('Unexpected Error');
      }
    } finally {
      setLoading(false);
      setDisabled(true);
      onEmailFocus();
    }
  };

  const handleValidation = useCallback(async () => {
    const validEmail = /[a-z0-9]+@/.test(email);
    const validPassword = /[A-Za-z0-9._%+-]{8,}/.test(password);

    setDisabled(!validEmail || !validPassword);
  }, [email, password]);

  useEffect(() => {
    handleValidation();
  }, [handleValidation]);

  useEffect(() => {
    onEmailFocus();
  }, []);

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleLogin} ref={root}>
        <Input ref={emailRef} value={email} onChange={onEmailChange} />
        <Input value={password} onChange={onPasswordChange} />
        <Button type="submit" disabled={disabled} loading={loading}>
          가입하기
        </Button>
        <div>
          <button>카카오</button>
          <button>네이버</button>
        </div>
      </form>
      <div onClick={() => setModalView('LOGIN_VIEW')}>로그인으로 이동하기</div>
    </div>
  );
};

export default SignUpView;
