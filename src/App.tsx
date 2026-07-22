import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Application from './pages/Application';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import { trackVisit } from './utils/api';

// Admin Pages
import AdminLayout from './components/AdminLayout';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import Settings from './pages/Admin/Settings';

import { SettingsProvider } from './context/SettingsContext';

function PublicLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    trackVisit();
  }, []);

  return (
    <SettingsProvider>
      <div className="min-h-screen bg-bg">
        <Header />
        <Suspense fallback={<div className="p-8 text-center text-gray-500">Зареждане...</div>}>
          {children}
        </Suspense>
        <Footer />
        <CookieConsent />
      </div>
    </SettingsProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/application" element={<PublicLayout><Application /></PublicLayout>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
