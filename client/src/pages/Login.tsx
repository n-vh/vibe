import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import Form from '../components/Form';

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [data, execute] = useFetch('http://localhost:6543/login', {
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
  //   return <div>Login email sent!</div>;
  // }

  return (
    <div className="flex h-screen flex-col">
      <div className="relative flex">
        <img src="/wave.svg" className="absolute h-[120px] w-full"></img>
        <h1 className="absolute top-1/2 left-1/2 mt-12 flex -translate-x-1/2 -translate-y-1/2 transform font-days text-6xl text-white">
          vibe
        </h1>
      </div>
      <div className="my-auto flex flex-col gap-8">
        <Form title={data.data ? '' : 'Log in'}>
          {data.data ? (
            <div className="text-md pl-2 pt-4 font-roboto font-medium tracking-wider text-blue">
              Log in e-mail sent!
            </div>
          ) : (
            <>
              <input
                className="mt-4 mb-2 rounded-[8px] border-2 border-pink p-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
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
            text="LOG IN"
            onClick={() => execute()}
            disabled={!!data.data}
          />
          <p className="text-md pl-2 pt-4 font-roboto font-medium tracking-wider text-blue">
            Did you mean to{' '}
            <Link to="/signup" className="text-bold text-dark-pink underline">
              sign up
            </Link>{' '}
            instead?
          </p>
        </div>
      </div>
    </div>
  );
}
