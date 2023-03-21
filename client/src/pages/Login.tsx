import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';

export function Login() {
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

  if (data.error) {
    return <div>Error: {data.error.message}</div>;
  } else if (data.loading) {
    return <div>Loading...</div>;
  } else if (data.data) {
    return <div>Login email sent!</div>;
  }

  return (
    <div>
      Login
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button onClick={execute}>Login</button>
    </div>
  );
}
