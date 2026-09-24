import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import { hydrateSite } from './config.js';
import { hydrateServices } from './data/services.js';
import { hydrateFaq } from './data/faq.js';
import { hydrateForo } from './pages/Foro.js';
import { hydrateBlog } from './data/blog.js';
import { hydratePages } from './seo.js';
import { upgradeLegacyHashUrl } from './router.js';

upgradeLegacyHashUrl();

// Carga el contenido editable (desde /admin) antes de pintar la app, para
// que no haya "parpadeo" mostrando primero los valores por defecto.
Promise.all([hydrateSite(), hydrateServices(), hydrateFaq(), hydrateForo(), hydrateBlog(), hydratePages()]).finally(() => {
  const root = createRoot(document.getElementById('root'));
  root.render(React.createElement(App));
});
