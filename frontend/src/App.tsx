import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Profile } from './components/Profile';
import { Login } from './components/Login';

function App() {
  return (
    <>
      <AuthenticatedTemplate>
        <Layout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Layout>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </UnauthenticatedTemplate>
    </>
  );
}

export default App;
