import React from 'react';
import { FAQ_CATEGORIES } from '../data/faq.js';
import AccordionItem, { AccordionList } from '../components/Accordion.js';
import { whatsappLink } from '../config.js';
import { Link } from '../router.js';
import { IconDocument, IconClock, IconFlagCheck, IconAdvice, IconInvoice, IconPackage, IconChat } from '../icons.js';

const CATEGORY_ICONS = {
  'Antes de la operación': IconDocument,
  'Durante la operación': IconClock,
  'Después de la operación': IconFlagCheck,
  'Sobre nuestros servicios': IconAdvice,
  'Facturación y costos': IconInvoice,
  'Sobre los productos': IconPackage,
  'Atención y contacto': IconChat,
};

function CategoryBlock({ category, intro, items }) {
  const CatIcon = CATEGORY_ICONS[category] || IconDocument;
  return React.createElement('div', { className: 'svc-area' },
    React.createElement('h3', { className: 'svc-area-title' },
      React.createElement('span', { className: 'svc-area-icon' }, React.createElement(CatIcon, { size: 22, stroke: '#1F6B32', strokeWidth: 1.6 })),
      category,
    ),
    intro && React.createElement('p', { className: 'faq-category-intro' }, intro),
    React.createElement('div', { className: 'faq-list-wrap' },
      items.map((item) => React.createElement(AccordionItem, { key: item.q, question: item.q },
        item.list
          ? React.createElement(AccordionList, { items: item.list })
          : item.a
            ? React.createElement('p', null, item.a)
            : React.createElement('p', null, React.createElement('span', { className: 'fill-me' }, 'Respuesta pendiente — agregar antes de publicar.')),
      )),
    ),
  );
}

export default function PreguntasFrecuentes() {
  return React.createElement(React.Fragment, null,

    React.createElement('section', { className: 'section', style: { paddingTop: 92, paddingBottom: 60 } },
      React.createElement('div', { className: 'wrap' },
        React.createElement('div', { className: 'eyebrow' }, 'Recursos'),
        React.createElement('h1', { className: 'page-title' }, 'Preguntas frecuentes'),
        React.createElement('p', { style: { color: '#4A5250', fontSize: 18, lineHeight: 1.65, maxWidth: 720 } },
          'Respuestas directas a lo que más nos preguntan antes, durante y después de una operación. ¿No encuentras tu pregunta? Búscala en el ',
          React.createElement(Link, { to: '/foro', className: 'link-underline' }, 'foro'),
          ' o escríbenos.',
        ),
      ),
    ),

    React.createElement('section', { className: 'px-60', style: { paddingBottom: 92 } },
      React.createElement('div', { className: 'wrap', style: { padding: 0 } },
        React.createElement('div', { className: 'svc-areas' },
          FAQ_CATEGORIES.map((c) => React.createElement(CategoryBlock, { key: c.category, ...c })),
        ),
      ),
    ),

    React.createElement('section', { className: 'final-cta' },
      React.createElement('div', { className: 'wrap' },
        React.createElement('div', null,
          React.createElement('h2', null, '¿Tu pregunta no está aquí?'),
          React.createElement('p', null, 'Escríbenos y te respondemos el mismo día hábil.'),
        ),
        React.createElement('a', {
          className: 'btn btn-dark', href: whatsappLink('Hola, tengo una pregunta que no encontré en su sección de preguntas frecuentes.'),
          target: '_blank', rel: 'noopener noreferrer',
        }, 'Escríbenos por WhatsApp'),
      ),
    ),
  );
}
