import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext, useFetch } from '../hooks';
import Form from '../components/Form';
import Button from '../components/Button';

export function ForgotPassword() {
  const { signIn } = useAuthContext();

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [data, execute] = useFetch<{ token: string }>('verify', {
    token,
    password,
  });

  const passwordError = useMemo(() => {
    return !!password.length && !!confirmPassword.length && password !== confirmPassword;
  }, [data]);

  useEffect(() => {
    data.setData(null);
  }, [password, confirmPassword]);

  useEffect(() => {
    if (data.data && data.data.token) {
      signIn(data.data.token);
      return navigate('/');
    }

    if (!token) {
      navigate('/login');
    }
  }, [data]);

  return (
    <div className="flex h-screen flex-col">
      <div className="my-auto flex flex-col gap-8 pt-12 md:w-5/6 md:self-center lg:w-3/6 lg:pt-32">
        <Form title="Change your password">
          <div id="withBorder" className="flex flex-col gap-4">
            <input
              className="rounded-[8px] border-2 border-pink p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              required
            />
            <input
              className="rounded-[8px] border-2 border-pink p-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              type="password"
              required
            />
            <div className="text-roboto relative pl-1 text-xs font-medium tracking-wider text-error">
              {passwordError && <p className="absolute">Passwords do not match.</p>}
            </div>
          </div>
        </Form>
        <div className="mx-6 flex flex-col">
          <Button
            className="rounded-[16px] border-[2.5px] border-dark-pink border-opacity-40 bg-pink py-2 px-12 font-roboto text-xl font-bold tracking-wider text-white shadow-custom disabled:opacity-60"
            text="CHANGE PASSWORD"
            onClick={() => execute()}
            disabled={!password || !confirmPassword || passwordError}
          />
        </div>
      </div>
    </div>
  );
}
