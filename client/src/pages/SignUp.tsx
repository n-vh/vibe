import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import Form from '../components/Form';
import Button from '../components/Button';

export function SignUp() {
  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, execute] = useFetch('http://localhost:6543/signup', {
    username,
    email,
    password,
  });

  const usernameError = useMemo(() => {
    return data.error?.message === 'USERNAME_ALREADY_USED';
  }, [data]);

  const emailError = useMemo(() => {
    return data.error?.message === 'EMAIL_ALREADY_USED';
  }, [data]);

  useEffect(() => {
    data.setError(null);
  }, [username, email, password]);

  const handleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="my-auto flex flex-col gap-8 md:w-5/6 md:self-center lg:w-3/6 lg:pt-32">
        <Form title={data.data ? '' : 'Sign up'}>
          {data.data ? (
            <div className="text-md pl-2 pt-4 font-roboto font-medium tracking-wider text-blue">
              Sign up e-mail sent!
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <input
                className="rounded-[8px] border-2 border-pink p-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                type="text"
                required
                // pattern="[A-Za-z0-9_]{3,25}"
                // title="Only letters, numbers, underscore; between 3 and 25 characters."
              />
              {usernameError && (
                <div className="text-roboto pl-1 text-xs tracking-wider text-error">
                  Username already used.
                </div>
              )}
              <input
                className="rounded-[8px] border-2 border-pink p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="text"
                required
                // pattern="[A-Za-z0-9_]{3,25}"
                // title="Only letters, numbers, underscore; between 3 and 25 characters."
              />
              {emailError && (
                <div className="text-roboto pl-1 text-xs tracking-wider text-error">
                  Email already used.
                </div>
              )}

              <input
                className="rounded-[8px] border-2 border-pink p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                required
              />

              <div className="text-roboto flex pl-1 tracking-wider">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  onChange={handleCheckBox}
                  className="mr-2"
                />
                <label htmlFor="acceptTerms" className="text-sm text-blue">
                  I accept the{' '}
                  <Link to="/terms" target="_blank" className="underline">
                    terms and conditions
                  </Link>
                </label>
              </div>
              <div className="text-roboto flex flex-col gap-2 text-sm font-medium tracking-wider text-error">
                <p className={username && password ? 'hidden' : 'flex'}>
                  Please fill in all the fields.
                </p>
                <p className={isChecked ? 'hidden' : 'flex'}>
                  Please accept the terms and conditions.
                </p>
              </div>
            </div>
          )}
        </Form>
        <div className="mx-6 flex flex-col">
          <Button
            className="rounded-[16px]  border-opacity-60 bg-white bg-opacity-80  py-2 px-12 font-roboto text-xl font-bold tracking-wider text-blue shadow-md disabled:opacity-60"
            text="SIGN UP"
            onClick={() => execute()}
            disabled={!!data.data || !username || !email || !password || !isChecked}
          />
          <p className="text-md pl-2 pt-4 font-roboto font-medium tracking-wider text-blue">
            Did you mean to{' '}
            <Link to="/login" className="text-bold text-dark-pink underline">
              log in
            </Link>{' '}
            instead?
          </p>
        </div>
      </div>
    </div>
  );
}
