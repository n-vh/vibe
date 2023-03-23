import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useNavigate, Link } from 'react-router-dom';
import Form from '../components/Form';
import Button from '../components/Button';

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

  return (
    <div className="flex h-screen flex-col">
      <div className="my-auto flex flex-col gap-8 md:w-5/6 md:self-center lg:w-3/6">
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
            disabled={!!data.data || !email || !username}
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
