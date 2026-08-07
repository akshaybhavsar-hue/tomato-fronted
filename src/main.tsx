import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppProvider } from './context/AppContext.tsx';

export const authService = 'https://localhost:5000';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* in clientId need to write real GoogleOAuthProvider id   */}
    <GoogleOAuthProvider clientId="<your_client_id>">
      <AppProvider>
        <App />
      </AppProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
