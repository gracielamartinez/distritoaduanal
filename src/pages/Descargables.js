import React from 'react';
import { whatsappLink } from '../config.js';

// Valores por defecto (respaldo si content/descargables.json no carga). Una
// vez editado desde /admin, el contenido real vive en content/descargables.json.
export const DESCARGABLES = [
  {
    title: 'Checklist: documentos para importar',
    description: 'Los 3 documentos básicos que debes reunir y los 3 trámites que requieren validación experta antes de que tu carga salga de origen.',
    format: 'PDF',
    file: '/assets/descargables/documentos-para-importar-2026.pdf',
    image: '/assets/descargables/documentos-para-importar-2026.jpg',
  },
];

// Reemplaza DESCARGABLES con lo que venga de content/descargables.json.
export async function hydrateDescargables() {
  try {
    const res = await fetch('/content/descargables.json');
    if (!res.ok) return;
    const data = await res.json();
    if (Array.isArray(data.items)) {
      DESCARGABLES.length = 0;
      DESCARGABLES.push(...data.items);
    }
  } catch (e) {
    // Sin conexión o sin content/descargables.json todavía: se mantienen los archivos por defecto.
  }
}

function DownloadCard({ title, description, format, file, image }) {
  return React.createElement('div', { className: 'dl-card' },
    image && React.createElement('img', { className: 'dl-card-preview', src: image, alt: title, loading: 'lazy' }),
    React.createElement('div', { className: 'dl-card-body' },
      React.createElement('span', { className: 'dl-badge' }, format || 'PDF'),
      React.createElement('h3', null, title),
      React.createElement('p', null, description),
      React.createElement('a', { className: 'btn btn-primary', href: file, download: '', target: '_blank', rel: 'noopener' }, 'Descargar'),
    ),
  );
}

export default function Descargables() {
  return React.createElement(React.Fragment, null,

    React.createElement('section', { className: 'section', style: { paddingTop: 92, paddingBottom: 60 } },
      React.createElement('div', { className: 'wrap' },
        React.createElement('div', { className: 'eyebrow' }, 'Clientes'),
        React.createElement('h1', { className: 'page-title' }, 'Descargables para clientes'),
        React.createElement('p', { style: { color: '#4A5250', fontSize: 18, lineHeight: 1.65, maxWidth: 720 } },
          'Guías y checklists para preparar tu importación, listos para descargar y compartir con tu proveedor.',
        ),
      ),
    ),

    React.createElement('section', { className: 'px-60', style: { paddingBottom: 92 } },
      React.createElement('div', { className: 'wrap', style: { padding: 0 } },
        DESCARGABLES.length
          ? React.createElement('div', { className: 'dl-grid' },
              DESCARGABLES.map((d) => React.createElement(DownloadCard, { key: d.file, ...d })))
          : React.createElement('p', { className: 'dl-empty' }, 'Estamos preparando materiales para ti. Mientras tanto, escríbenos y te los enviamos.'),
      ),
    ),

    React.createElement('section', { className: 'final-cta' },
      React.createElement('div', { className: 'wrap' },
        React.createElement('div', null,
          React.createElement('h2', null, '¿Necesitas otro documento?'),
          React.createElement('p', null, 'Escríbenos por WhatsApp y con gusto te lo compartimos.'),
        ),
        React.createElement('a', {
          className: 'btn btn-dark', href: whatsappLink('Hola, quisiera pedir un material que no encuentro en sus descargables.'),
          target: '_blank', rel: 'noopener noreferrer',
        }, 'Escríbenos por WhatsApp'),
      ),
    ),
  );
}
