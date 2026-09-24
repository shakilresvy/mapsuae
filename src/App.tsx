import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './views/Home';
import Catalogue from './views/Catalogue';
import About from './views/About';
import Profile from './views/Profile';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  const [hash, setHash] = useState(window.location.hash || '#home');

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash || '#home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderView = () => {
    if (hash.startsWith('#catalogue')) {
      return (
        <ErrorBoundary resetKeys={[hash]} title="Catalogue View Error" description="Unable to load the PDF Catalogue viewer. Please try again or return to the home search.">
          <Catalogue />
        </ErrorBoundary>
      );
    }
    if (hash.startsWith('#about')) {
      return (
        <ErrorBoundary resetKeys={[hash]} title="About View Error" description="Unable to load the company history section.">
          <About />
        </ErrorBoundary>
      );
    }
    if (hash.startsWith('#profile')) {
      return (
        <ErrorBoundary resetKeys={[hash]} title="Contact & Profile Error" description="Unable to load the contact and brand directory.">
          <Profile />
        </ErrorBoundary>
      );
    }
    return (
      <ErrorBoundary resetKeys={[hash]} title="Inventory Catalog Error" description="Unable to load the main inventory lookup. Please try resetting or contact our showroom directly.">
        <Home />
      </ErrorBoundary>
    );
  };

  return (
    <ErrorBoundary title="Application Error" description="An unexpected error interrupted the application. Please reload or contact our sales team.">
      <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
        <ErrorBoundary compact title="Navigation Menu Error">
          <Navbar currentHash={hash} />
        </ErrorBoundary>
        <main className="flex-grow pt-24 sm:pt-28">
          {renderView()}
        </main>
        <ErrorBoundary compact title="Footer Error">
          <Footer />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
}
