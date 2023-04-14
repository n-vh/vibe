import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import {
  useAuthContext,
  useDeleteContext,
  useSearchContext,
  useTermsContext,
} from './hooks';
import { Index } from './pages/Index';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { SignUp } from './pages/SignUp';
import { Verify } from './pages/Verify';
import { VibeOne } from './pages/VibeOne';
import Header from './components/Header';
import Search from './components/Search';
import DeleteModal from './components/DeleteModal';
import TermsModal from './components/TermsModal';

function Protected() {
  const { isAuthorized } = useAuthContext();

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export function Router() {
  const { showDelete } = useDeleteContext();
  const { showSearch } = useSearchContext();
  const { showTerms } = useTermsContext();

  return (
    <BrowserRouter>
      <Header />
      {showDelete && <DeleteModal />}
      {showSearch && <Search />}
      {showTerms && <TermsModal />}
      <Routes>
        <Route path="/" index element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<Verify />} />
        <Route element={<Protected />}>
          <Route path="/vibe/:id" element={<VibeOne />} />
          <Route path="/profile/:username/:tab" element={<Profile />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
