import React from 'react';
import { SERVICE_AREAS } from '../data/services.js';
import { whatsappLink } from '../config.js';
import { IconTrade, IconLogistics, IconCustoms, IconPackage, IconShield, IconAdvice, IconCheck } from '../icons.js';

const AREA_ICONS = {
  trade: IconTrade,
  logistics: IconLogistics,
  customs: IconCustoms,
  package: IconPackage,
  shield: IconShield,
  advice: IconAdvice,
};

function ServiceArea({ area, icon, items }) {
  const AreaIcon = AREA_ICONS[icon] || IconAdvice;
  return React.createElement('div', { className: 'svc-area' },
    React.createElement('h3', { className: 'svc-area-title' },
      React.createElement('span', { className: 'svc-area-icon' }, React.createElement(AreaIcon, { size: 22, stroke: '#1F6B32', strokeWidth: 1.6 })),
      area,
    ),
    React.createElement('div', { className: 'svc-items' },
      items.map((item) => React.createElement('div', { className: 'svc-item', key: item.title },
        React.createElement('div', { className: 'svc-item-title' },
          React.createElement(IconCheck, { size: 16, stroke: '#35A94C', strokeWidth: 2 }),
          React.createElement('span', null, item.title),
        ),
        React.createElement('p', null, item.text),
      )),
    ),
  );
}

export default function Servicios() {
  return React.createElement(React.Fragment, null,

    React.createElement('section', { className: 'section', style: { paddingTop: 92, paddingBottom: 60 } },
      React.createElement('div', { className: 'wrap' },
        React.createElement('div', { className: 'eyebrow' }, 'Servicios'),
        React.createElement('h1', { className: 'page-title' }, '¿Cómo explicamos nuestros servicios?'),
        React.createElement('p', { style: { color: '#4A5250', fontSize: 18, lineHeight: 1.65, maxWidth: 720 } },
          'Organizamos nuestro trabajo en seis áreas. Cada una agrupa los servicios puntuales que puedes necesitar, con una explicación clara de en qué consisten — sin tecnicismos innecesarios.',
        ),
      ),
    ),

    React.createElement('section', { className: 'px-60', style: { paddingBottom: 92 } },
      React.createElement('div', { className: 'wrap', style: { padding: 0 } },
        React.createElement('div', { className: 'svc-areas' },
          SERVICE_AREAS.map((a) => React.createElement(ServiceArea, { key: a.area, ...a })),
        ),
      ),
    ),

    React.createElement('section', { className: 'final-cta' },
      React.createElement('div', { className: 'wrap' },
        React.createElement('div', null,
          React.createElement('h2', null, '¿No encuentras lo que necesitas?'),
          React.createElement('p', null, 'Cuéntanos tu operación y te decimos qué servicio te conviene.'),
        ),
        React.createElement('a', {
          className: 'btn btn-dark', href: whatsappLink('Hola, tengo una duda sobre sus servicios.'),
          target: '_blank', rel: 'noopener noreferrer',
        }, 'Escríbenos por WhatsApp'),
      ),
    ),
  );
}
