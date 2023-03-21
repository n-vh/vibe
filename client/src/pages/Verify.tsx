import { useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAuthContext, useFetch } from '../hooks';

export function Verify() {
  const { signIn } = useAuthContext();
  const [searchParams] = useSearchParams();
  const [data, execute] = useFetch<{ token: string }>('http://localhost:6543/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: searchParams.get('token'),
    }),
  });

  useEffect(() => {
    execute();
  }, []);

  if (data.loading) {
    return <div>Loading...</div>;
  } else if (data.data) {
    signIn(data.data.token || '');
    return <Navigate to="/home" replace />;
  } else if (data.error) {
    return <Navigate to="/" replace />;
  }

  return <div>Verify</div>;
}
