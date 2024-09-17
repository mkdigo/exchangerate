import { BrowserRouter as Router } from 'react-router-dom';

import { Routes } from './Routes';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import './styles/GlobalStyles.css';

export function App() {
  return (
    <Router basename={import.meta.env.VITE_BASENAME}>
      <Header />
      <Routes />
      <Footer />
    </Router>
  );
}
