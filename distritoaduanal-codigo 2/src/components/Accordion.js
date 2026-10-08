import React, { useState } from 'react';
import { IconCheck } from '../icons.js';

export function Chevron({ open }) {
  return React.createElement('svg', {
    width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: '#35A94C',
    strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round',
    style: { flex: '0 0 auto', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s ease' },
  }, React.createElement('path', { d: 'M6 9l6 6 6-6' }));
}

export default function AccordionItem({ question, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return React.createElement('div', { className: 'faq-item' },
    React.createElement('button', {
      className: 'faq-question',
      onClick: () => setOpen((v) => !v),
      'aria-expanded': open,
    },
      React.createElement('span', null, question),
      React.createElement(Chevron, { open }),
    ),
    open && React.createElement('div', { className: 'faq-answer' }, children),
  );
}

export function AccordionList({ items }) {
  return React.createElement('ul', { className: 'faq-list' },
    items.map((text) => React.createElement('li', { key: text },
      React.createElement(IconCheck, { size: 18, stroke: '#35A94C', strokeWidth: 2 }),
      React.createElement('span', null, text),
    )),
  );
}
