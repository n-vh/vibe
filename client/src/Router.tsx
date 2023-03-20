import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { Home } from './pages/Home';
import { Index } from './pages/Index';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { SignUp } from './pages/SignUp';
import { Verify } from './pages/Verify';
import { Vibe } from './pages/Vibe';

function Protected() {
  const { isAuthorized: isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify/:token" element={<Verify />} />
        <Route element={<Protected />}>
          <Route path="/home" element={<Home />} />
          <Route path="/vibe/:id" element={<Vibe />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
