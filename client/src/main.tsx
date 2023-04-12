import ReactDOM from 'react-dom/client';
import { AuthProvider } from './providers/AuthProvider';
import { GraphQLProvider } from './providers/GraphQLProvider';
import { SearchProvider } from './providers/SearchProvider';
import { DeleteProvider } from './providers/DeleteProvider';
import { ConfirmModalProvider } from './providers/ConfirmModalProvider';
import { Router } from './Router';
import 'flowbite';
import './index.css';
import 'animate.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GraphQLProvider>
    <AuthProvider>
      <SearchProvider>
        <DeleteProvider>
          <ConfirmModalProvider>
            <Router />
          </ConfirmModalProvider>
        </DeleteProvider>
      </SearchProvider>
    </AuthProvider>
  </GraphQLProvider>,
);
