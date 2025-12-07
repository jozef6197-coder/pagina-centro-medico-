import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Requirements from './pages/Requirements';
import Approvals from './pages/Approvals';
import Logistics from './pages/Logistics';
import Warehouse from './pages/Warehouse';
import Admin from './pages/Admin';
import Catalog from './pages/Catalog';

const AppRoutes = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Login />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/requirements" element={<Requirements />} />
        <Route path="/approvals" element={<Approvals />} />
        <Route path="/logistics" element={<Logistics />} />
        <Route path="/warehouse" element={<Warehouse />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </DataProvider>
  );
};

export default App;
