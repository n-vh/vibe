import ReactDOM from 'react-dom/client';
import { Router } from './Router';
import {
  AuthProvider,
  ConfirmModalProvider,
  DeleteProvider,
  GraphQLProvider,
  SearchProvider,
} from './providers';
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
