import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './providers/AuthProvider';
import { ServerProvider } from './providers/ServerProvider';
import { Router } from './Router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ServerProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ServerProvider>
  </React.StrictMode>,
);
