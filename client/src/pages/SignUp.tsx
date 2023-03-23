import { useEffect, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import Header from '../components/Header';
import Form from '../components/Form';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

export function SignUp() {
  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [data, execute, resetError] = useFetch('http://localhost:6543/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
    }),
  });

  useEffect(() => {
    if (data.error) {
      if (data.error.message === 'EMAIL_ALREADY_USED') {
        setEmailError(true);
      } else if (data.error.message === 'USERNAME_ALREADY_USED') {
        setUsernameError(true);
      }
    }
  }, [data]);

  const onUserNameChange = (value: string) => {
    setUsername(value);
    resetError();
    setUsernameError(false);
  };

  const onEmailChange = (value: string) => {
    setEmail(value);
    resetError();
    setEmailError(false);
  };

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
                onChange={(e) => onUserNameChange(e.target.value)}
                placeholder="Choose a username"
                type="text"
                required
                // pattern="[A-Za-z0-9_]{3,25}"
                // title="Only letters, numbers, underscore; between 3 and 25 characters."
              />
              {usernameError && (
                <div className="text-roboto pl-1 text-xs tracking-wider text-red-600">
                  Username already used.
                </div>
              )}
              <input
                className="rounded-[8px] border-2 border-pink p-2"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                placeholder="Email"
                type="email"
                required
              />
              {emailError && (
                <div className="text-roboto pl-1 text-xs tracking-wider text-red-600">
                  Email already used.
                </div>
              )}
              <div className="text-roboto flex pt-6 pl-1 tracking-wider">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  onChange={handleCheckBox}
                  className="mr-2"
                />
                <label htmlFor="acceptTerms" className="text-sm text-blue">
                  I accept the{' '}
                  <Link to="/Terms" className=" underline">
                    terms and conditions
                  </Link>
                </label>
              </div>
              <div className="text-roboto flex flex-col gap-2 text-sm font-medium tracking-wider text-red-600">
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
            disabled={!!data.data || !email || !username || !isChecked}
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
