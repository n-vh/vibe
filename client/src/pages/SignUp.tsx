import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import Header from '../components/Header';
import Form from '../components/Form';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

export function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [data, execute] = useFetch('http://localhost:6543/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
    }),
  });

  // if (data.error) {
  //   return <div>Error: {data.error.message}</div>;
  // } else if (data.loading) {
  //   return <div>Loading...</div>;
  // } else if (data.data) {
  //   return <div>Sign Up email sent!</div>;
  // }

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="my-auto flex flex-col gap-8 md:w-5/6 md:self-center lg:w-3/6">
        <Form title={data.data ? '' : 'Sign up'}>
          {data.data ? (
            <div className="text-md pl-2 pt-4 font-roboto font-medium tracking-wider text-blue">
              Sign up e-mail sent!
            </div>
          ) : (
            <>
              <input
                className="mt-4 mb-2 rounded-[8px] border-2 border-pink p-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                type="text"
                // pattern="[A-Za-z0-9_]{3,25}"
                // title="Only letters, numbers, underscore; between 3 and 25 characters."
              />
              <input
                className="mt-4 rounded-[8px] border-2 border-pink p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                required
              />
            </>
          )}
        </Form>
        <div className="mx-6 flex flex-col">
          <Button
            className="rounded-[16px]  border-opacity-60 bg-white bg-opacity-80  py-2 px-12 font-roboto text-xl font-bold tracking-wider text-blue shadow-md disabled:opacity-60"
            text="SIGN UP"
            onClick={() => execute()}
            disabled={!!data.data}
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
