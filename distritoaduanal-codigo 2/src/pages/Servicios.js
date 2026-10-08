import React, { useState } from 'react';
import { SERVICE_AREAS } from '../data/services.js';
import { whatsappLink } from '../config.js';
import { IconTrade, IconLogistics, IconCustoms, IconPackage, IconShield, IconAdvice, IconCheck } from '../icons.js';
import { Chevron } from '../components/Accordion.js';

const AREA_ICONS = {
  trade: IconTrade,
  logistics: IconLogistics,
  customs: IconCustoms,
  package: IconPackage,
  shield: IconShield,
  advice: IconAdvice,
};

function ServiceArea({ area, icon, items, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const AreaIcon = AREA_ICONS[icon] || IconAdvice;
  return React.createElement('div', { className: 'svc-area' },
    React.createElement('button', {
      className: 'svc-area-title svc-area-toggle',
      onClick: () => setOpen((v) => !v),
      'aria-expanded': open,
    },
      React.createElement('span', { className: 'svc-area-icon' }, React.createElement(AreaIcon, { size: 22, stroke: '#1F6B32', strokeWidth: 1.6 })),
      React.createElement('span', { className: 'svc-area-title-text' }, area),
      React.createElement('span', { className: 'svc-area-count' }, `${items.length} servicio${items.length === 1 ? '' : 's'}`),
      React.createElement(Chevron, { open }),
    ),
    open && React.createElement('div', { className: 'svc-items' },
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
          'Organizamos nuestro trabajo en seis áreas. Da clic en cada una para ver el detalle de lo que incluye — sin tecnicismos innecesarios.',
        ),
      ),
    ),

    React.createElement('section', { className: 'px-60', style: { paddingBottom: 92 } },
      React.createElement('div', { className: 'wrap', style: { padding: 0 } },
        React.createElement('div', { className: 'svc-areas' },
          SERVICE_AREAS.map((a, i) => React.createElement(ServiceArea, { key: a.area, ...a, defaultOpen: i === 0 })),
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
