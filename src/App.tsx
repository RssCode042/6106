import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Application from './pages/Application';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';

export default function App() {
  return (
    <BrowserRouter basename="/">
      <Header />
      <div className="min-h-screen bg-bg">
        <Suspense fallback={<div className="p-8 text-center text-gray-500">Зареждане...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/application" element={<Application />} />
          </Routes>
        </Suspense>
        <Footer />
        <CookieConsent />
      </div>
    </BrowserRouter>
  );
}
