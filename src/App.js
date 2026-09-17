import React from 'react';
import { useRoute } from './router.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import WhatsAppButton from './components/WhatsAppButton.js';
import Home from './pages/Home.js';
import Servicios from './pages/Servicios.js';
import PreguntasFrecuentes from './pages/PreguntasFrecuentes.js';
import Foro from './pages/Foro.js';
import Nosotros from './pages/Nosotros.js';

const PAGES = {
  '/': Home,
  '/servicios': Servicios,
  '/preguntas-frecuentes': PreguntasFrecuentes,
  '/foro': Foro,
  '/nosotros': Nosotros,
};

export default function App() {
  const route = useRoute();
  const Page = PAGES[route] || Home;

  return React.createElement(React.Fragment, null,
    React.createElement(Header, { route }),
    React.createElement('main', null, React.createElement(Page, null)),
    React.createElement(Footer, null),
    React.createElement(WhatsAppButton, null),
  );
}
