import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { LessonsProvider } from './contexts/LessonsContext.jsx';
import { WebLabUiCustomizeProvider } from './contexts/WebLabUiCustomizeContext.jsx';
import { WebLabDashboardHackProvider } from './contexts/WebLabDashboardHackContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <LessonsProvider>
            <WebLabUiCustomizeProvider>
              <WebLabDashboardHackProvider>
                <App />
              </WebLabDashboardHackProvider>
            </WebLabUiCustomizeProvider>
          </LessonsProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
