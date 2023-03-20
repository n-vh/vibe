import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

export function Verify() {
  const { signIn } = useAuthContext();
  const { token } = useParams<{ token: string }>();
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Navigate to="/" replace />;
}
