import React from 'react';
import { whatsappLink, SITE } from '../config.js';

const STORY_PARAGRAPHS = [
  'Detrás de Distrito Aduanal hay un equipo de personas que entiende perfectamente lo desgastante que puede ser enfrentarse a la burocracia, los trámites confusos y las sorpresas del comercio internacional.',
  'Nacimos con una idea clara: el comercio exterior no tiene por qué ser una pesadilla técnica ni un camino solitario. Por eso nos gusta vernos como un miembro más de tu equipo.',
  'Trabajamos mano a mano contigo —seas importador, exportador, emprendedor o profesionista— para que muevas tus proyectos de forma ordenada, segura y con la cabeza fría. Queremos que hagas crecer tu negocio sin la preocupación de poner en riesgo tu inversión o tu tranquilidad.',
  'A nosotros nos mueve la empatía de verdad. Entendemos perfectamente que detrás de cada contenedor o de cada paquete no solo hay productos: hay dinero invertido de tu bolsa, clientes que están contando los días para recibir su pedido y sueños que dependen de que todo salga bien.',
  'Por eso combinamos el cuidado exhaustivo de cada detalle técnico con algo que sentimos que le hace falta al comercio exterior: un trato cercano, honesto y directo.',
  `En ${SITE.name} no solo nos encargamos de que tus operaciones fluyan; cuidamos tu esfuerzo como si fuera el nuestro.`,
];

const PILLARS = [
  {
    title: 'Misión',
    text: 'Brindar asesoría especializada y personalizada para gestionar operaciones de comercio interior y exterior, ofreciendo un servicio eficiente, confiable y transparente.',
  },
  {
    title: 'Visión',
    text: 'Posicionar a la compañía como referente del sector, distinguiéndose por su excelencia, confiabilidad y compromiso con la satisfacción de sus clientes.',
  },
  {
    title: 'Propuesta de valor',
    text: 'Ofrecer un acompañamiento integral en operaciones de comercio interior y exterior, proponer soluciones estratégicas con enfoque en la prevención de riesgos y la eficiencia operativa, garantizando procesos transparentes, honestos y confiables para obtener resultados que satisfagan las necesidades de los clientes.',
  },
];

export default function Nosotros() {
  return React.createElement(React.Fragment, null,

    React.createElement('section', { className: 'section', style: { paddingTop: 92, paddingBottom: 60 } },
      React.createElement('div', { className: 'wrap' },
        React.createElement('div', { className: 'eyebrow' }, 'Nosotros'),
        React.createElement('h1', { className: 'page-title' }, '¿Quiénes somos?'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 760 } },
          STORY_PARAGRAPHS.map((p, i) => React.createElement('p', {
            key: i,
            style: { color: '#4A5250', fontSize: 17, lineHeight: 1.7 },
          }, p)),
        ),
      ),
    ),

    React.createElement('section', { className: 'px-60', style: { paddingBottom: 92 } },
      React.createElement('div', { className: 'wrap', style: { padding: 0 } },
        React.createElement('div', { className: 'pillars' },
          PILLARS.map((p) => React.createElement('div', { className: 'pillar', key: p.title },
            React.createElement('h3', null, p.title),
            React.createElement('p', null, p.text),
          )),
        ),
      ),
    ),

    React.createElement('section', { className: 'final-cta' },
      React.createElement('div', { className: 'wrap' },
        React.createElement('div', null,
          React.createElement('h2', null, '¿Hablamos?'),
          React.createElement('p', null, 'Cuéntanos tu operación y te decimos cómo podemos ayudarte.'),
        ),
        React.createElement('a', {
          className: 'btn btn-dark', href: whatsappLink(`Hola, quiero más información sobre ${SITE.name}.`),
          target: '_blank', rel: 'noopener noreferrer',
        }, 'Escríbenos por WhatsApp'),
      ),
    ),
  );
}
