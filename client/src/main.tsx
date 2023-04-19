import ReactDOM from 'react-dom/client';
import { Router } from './Router';
import {
  AuthProvider,
  ConfirmModalProvider,
  CookieProvider,
  DeleteProvider,
  GraphQLProvider,
  PrivacyProvider,
  SearchProvider,
  TermsProvider,
} from './providers';
import './index.css';
import 'animate.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GraphQLProvider>
    <AuthProvider>
      <SearchProvider>
        <DeleteProvider>
          <ConfirmModalProvider>
            <TermsProvider>
              <PrivacyProvider>
                <CookieProvider>
                  <Router />
                </CookieProvider>
              </PrivacyProvider>
            </TermsProvider>
          </ConfirmModalProvider>
        </DeleteProvider>
      </SearchProvider>
    </AuthProvider>
  </GraphQLProvider>,
);
