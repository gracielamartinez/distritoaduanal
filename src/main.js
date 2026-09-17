import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import { hydrateSite } from './config.js';
import { hydrateServices } from './data/services.js';
import { hydrateFaq } from './data/faq.js';

// Carga el contenido editable (desde /admin) antes de pintar la app, para
// que no haya "parpadeo" mostrando primero los valores por defecto.
Promise.all([hydrateSite(), hydrateServices(), hydrateFaq()]).finally(() => {
  const root = createRoot(document.getElementById('root'));
  root.render(React.createElement(App));
});
