import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthPage } from './pages/AuthPage';
import { Dashboard } from './pages/Dashboard';
import { Datasets } from './pages/Datasets';
import { Portfolios } from './pages/Portfolios';
import { Predictor } from './pages/Predictor';
import { Engineer } from './pages/Engineer';
import StudioAudioForge from './pages/StudioAudioForge/StudioAudioForge';
import { LandingPage } from './pages/LandingPage';
import { 
  Analytics, 
  Profile, 
  APIDocs, 
  HelpCenter, 
  Billing, 
  Admin, 
  Forum, 
  Onboarding 
} from './pages/PlaceholderPages';

import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Protected App Routes */}
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/datasets" element={<Layout><Datasets /></Layout>} />
          <Route path="/portfolios" element={<Layout><Portfolios /></Layout>} />
          <Route path="/predict" element={<Layout><Predictor /></Layout>} />
          <Route path="/train" element={<StudioAudioForge />} />
          <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/api-docs" element={<Layout><APIDocs /></Layout>} />
          <Route path="/help" element={<Layout><HelpCenter /></Layout>} />
          <Route path="/billing" element={<Layout><Billing /></Layout>} />
          <Route path="/admin" element={<Layout><Admin /></Layout>} />
          <Route path="/forum" element={<Layout><Forum /></Layout>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
