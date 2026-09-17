import React, { useState } from 'react';
import { Link } from '../router.js';
import { whatsappLink } from '../config.js';

// Temas más comentados: una selección curada de FAQ_CATEGORIES para dar
// contexto rápido. El foro no publica hilos en vivo (el sitio no tiene
// backend) — cada pregunta enviada llega directo al equipo por WhatsApp.
const TRENDING = [
  {
    tag: 'Antes de la operación',
    q: '¿Necesito contratar seguro de carga? ¿No responde la naviera?',
    a: 'Sí, sugerimos contratarlo. Las navieras tienen esquemas de responsabilidad muy limitados, y ante cualquier evento, el seguro cubre el valor real de tu inversión.',
  },
  {
    tag: 'Durante la operación',
    q: '¿Por qué me cobran almacenajes y demoras si el retraso no fue mi culpa?',
    a: 'Las terminales y navieras aplican las tarifas cuando la mercancía pasa más días de lo permitido en el recinto, sin importar el motivo. Hacemos todo lo posible por evitarlos.',
  },
  {
    tag: 'Después de la operación',
    q: '¿Qué pasa si el SAT me revisa dentro de dos o tres años?',
    a: 'Nada de qué preocuparse: tienes el expediente completo para respaldarte, y estaremos aquí para apoyarte con cualquier aclaración.',
  },
  {
    tag: 'Sobre los productos',
    q: '¿Por qué el pedimento no viene a mi nombre?',
    a: 'Porque nosotros estamos dados de alta en el padrón de importadores, lo que nos permite hacer la importación a nuestro nombre y responsabilizarnos ante la autoridad durante todo el proceso.',
  },
  {
    tag: 'Sobre nuestros servicios',
    q: '¿Puedo importar aunque no tenga padrón de importadores?',
    a: 'Sí, ofrecemos opciones para importar sin padrón o te ayudamos a activarlo si lo necesitas.',
  },
  {
    tag: 'Facturación y costos',
    q: '¿Puedo deducir mis facturas?',
    a: 'Sí. Emitimos factura electrónica (CFDI) válida en México. Solo requerimos tus datos fiscales.',
  },
];

function ThreadCard({ tag, q, a }) {
  return React.createElement('div', { className: 'forum-thread' },
    React.createElement('span', { className: 'forum-tag' }, tag),
    React.createElement('h3', null, q),
    React.createElement('p', null, a),
  );
}

function AskForm() {
  const [nombre, setNombre] = useState('');
  const [pregunta, setPregunta] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pregunta.trim()) return;
    const lines = [
      nombre.trim() ? `Hola, soy ${nombre.trim()}.` : 'Hola.',
      'Tengo una pregunta para el foro:',
      pregunta.trim(),
    ];
    window.open(whatsappLink(lines.join('\n')), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  if (sent) {
    return React.createElement('p', { style: { color: '#1F6B32', fontWeight: 600 } }, '¡Gracias! Se abrió WhatsApp con tu pregunta lista para enviar.');
  }

  return React.createElement('form', { className: 'form-fields', onSubmit: handleSubmit },
    React.createElement('input', { type: 'text', placeholder: 'Tu nombre (opcional)', value: nombre, onChange: (e) => setNombre(e.target.value) }),
    React.createElement('textarea', {
      placeholder: 'Escribe tu pregunta…', value: pregunta,
      onChange: (e) => setPregunta(e.target.value), required: true,
    }),
    React.createElement('button', { type: 'submit', className: 'form-submit' }, 'Enviar pregunta'),
  );
}

export default function Foro() {
  return React.createElement(React.Fragment, null,

    React.createElement('section', { className: 'section', style: { paddingTop: 92, paddingBottom: 60 } },
      React.createElement('div', { className: 'wrap' },
        React.createElement('div', { className: 'eyebrow' }, 'Recursos'),
        React.createElement('h1', { className: 'page-title' }, 'Foro'),
        React.createElement('p', { style: { color: '#4A5250', fontSize: 18, lineHeight: 1.65, maxWidth: 720 } },
          'Un espacio para resolver las dudas más comunes de nuestra comunidad de importadores. Explora los temas más comentados o manda tu propia pregunta — te respondemos directo por WhatsApp.',
        ),
      ),
    ),

    React.createElement('section', { className: 'px-60', style: { paddingBottom: 30 } },
      React.createElement('div', { className: 'wrap', style: { padding: 0 } },
        React.createElement('h2', { style: { fontSize: 24, fontWeight: 600, marginBottom: 24 } }, 'Temas más comentados'),
        React.createElement('div', { className: 'forum-grid' },
          TRENDING.map((t) => React.createElement(ThreadCard, { key: t.q, ...t })),
        ),
        React.createElement(Link, { to: '/preguntas-frecuentes', className: 'link-underline', style: { display: 'inline-block', marginTop: 32 } }, 'Ver todas las preguntas frecuentes →'),
      ),
    ),

    React.createElement('section', { className: 'px-60', style: { paddingTop: 62, paddingBottom: 92 } },
      React.createElement('div', { className: 'wrap', style: { padding: 0 } },
        React.createElement('div', { className: 'card', style: { maxWidth: 560 } },
          React.createElement('h2', { style: { fontSize: 24, fontWeight: 600, marginBottom: 10 } }, '¿Tienes una pregunta nueva?'),
          React.createElement('p', { style: { color: '#6B7472', fontSize: 15, lineHeight: 1.6, marginBottom: 24 } },
            'Escríbela aquí. No se publica en el sitio — llega directo a nuestro equipo por WhatsApp y te respondemos el mismo día hábil.',
          ),
          React.createElement(AskForm, null),
        ),
      ),
    ),
  );
}
