import React from 'react';
import { useRoute, matchRoute } from './router.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import WhatsAppButton from './components/WhatsAppButton.js';
import Home from './pages/Home.js';
import Servicios from './pages/Servicios.js';
import PreguntasFrecuentes from './pages/PreguntasFrecuentes.js';
import Foro from './pages/Foro.js';
import Blog from './pages/Blog.js';
import BlogPost from './pages/BlogPost.js';
import Nosotros from './pages/Nosotros.js';

const PAGES = {
  '/': Home,
  '/servicios': Servicios,
  '/preguntas-frecuentes': PreguntasFrecuentes,
  '/foro': Foro,
  '/blog': Blog,
  '/nosotros': Nosotros,
};

function resolvePage(route) {
  const blogParams = matchRoute('/blog/:slug', route);
  if (blogParams) return React.createElement(BlogPost, { slug: blogParams.slug });
  const Page = PAGES[route] || Home;
  return React.createElement(Page, null);
}

export default function App() {
  const route = useRoute();

  return React.createElement(React.Fragment, null,
    React.createElement(Header, { route }),
    React.createElement('main', null, resolvePage(route)),
    React.createElement(Footer, null),
    React.createElement(WhatsAppButton, null),
  );
}
