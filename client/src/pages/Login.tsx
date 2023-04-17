import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext, useFetch } from '../hooks';
import { Title } from '../components/Title';
import Form from '../components/Form';
import Button from '../components/Button';
import ConfirmModal from '../components/ConfirmModal';

export function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuthContext();

  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [loginData, executeLogin] = useFetch<{ token: string }>('login', {
    username,
    password,
  });
  const [passwordData, executePassword] = useFetch(
    'http://localhost:6543/forgot-password',
    { email },
  );

  const usernameError = useMemo(() => {
    return loginData.error?.message === 'USER_NOT_FOUND';
  }, [loginData]);

  const passwordError = useMemo(() => {
    return loginData.error?.message === 'WRONG_PASSWORD';
  }, [loginData]);

  useEffect(() => {
    if (loginData.data && loginData.data.token) {
      signIn(loginData.data.token);
      return navigate('/');
    }
  }, [loginData]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    executeLogin();
  };

  const handleForgotPassword = () => {
    setEmail('');
    passwordData.setData({ sent: false });
    setForgotPasswordModal(false);
  };

  return (
    <div className="flex h-screen flex-col">
      <Title text="Log in – vibe" />
      {forgotPasswordModal && (
        <ConfirmModal
          action={() => executePassword()}
          closeModal={handleForgotPassword}
          textAction={passwordData.data ? 'Email sent' : 'Send email'}
          textCancel={passwordData.data ? 'Close' : 'Cancel'}
          disabled={!email.length || !!passwordData.data || false}
        >
          <div className="flex flex-wrap justify-center gap-6">
            Please enter the email address associated with your account to change your
            password.
            <input
              className="w-full rounded-[8px] border-2 border-pink p-2 md:w-[85%]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              required
            />
          </div>
        </ConfirmModal>
      )}

      <form
        className="my-auto flex flex-col gap-8 md:w-5/6 md:self-center lg:w-3/6 lg:pt-32"
        onSubmit={handleLogin}
      >
        <Form title="Welcome back!">
          <div id="withBorder" className="flex flex-col gap-4">
            <input
              className="rounded-[8px] border-2 border-pink p-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              type="text"
              required
              // pattern="[A-Za-z0-9_]{3,25}"
              // title="Only letters, numbers, underscore; between 3 and 25 characters."
            />
            <input
              className="rounded-[8px] border-2 border-pink p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              required
            />
            <p className="pl-2 font-roboto text-sm font-medium tracking-wider text-blue">
              <Button
                text="Forgot your password?"
                className="hover:undeline"
                type="button"
                onClick={() => setForgotPasswordModal(true)}
              />
              {/* <Link to="/forgot-password">Forgot your password?</Link> */}
            </p>
            {usernameError && (
              <div className="pl-1 text-sm font-medium tracking-wider text-error">
                User not found.
              </div>
            )}
            {passwordError && (
              <div className="pl-1 text-sm font-medium tracking-wider text-error">
                Wrong password.
              </div>
            )}
          </div>
        </Form>
        <div className="mx-6 flex flex-col">
          <Button
            className="rounded-[16px] border-[2.5px] border-dark-pink border-opacity-40 bg-pink py-2 px-12 font-roboto text-xl font-bold tracking-wider text-white shadow-custom disabled:opacity-60"
            text="LOG IN"
            type="submit"
            disabled={!username || !password}
          />
          <p className="text-md pl-2 pt-4 font-roboto font-medium tracking-wider text-blue">
            Did you mean to{' '}
            <Link to="/signup" className="text-bold text-dark-pink underline">
              sign up
            </Link>{' '}
            instead?
          </p>
        </div>
      </form>
    </div>
  );
}
