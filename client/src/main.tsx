import ReactDOM from 'react-dom/client';
import { AuthProvider } from './providers/AuthProvider';
import { GraphQLProvider } from './providers/GraphQLProvider';
import { Router } from './Router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GraphQLProvider>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </GraphQLProvider>,
);
