import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useAuthContext } from './hooks';
import { Home } from './pages/Home';
import { Index } from './pages/Index';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { SignUp } from './pages/SignUp';
import { Terms } from './pages/Terms';
import { Verify } from './pages/Verify';
import { Vibe } from './pages/Vibe';
import Header from './components/Header';

function Protected() {
  const { isAuthorized } = useAuthContext();

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" index element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/terms" element={<Terms />} />
        <Route element={<Protected />}>
          <Route path="/vibe/:id" element={<Vibe />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
