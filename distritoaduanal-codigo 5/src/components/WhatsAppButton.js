import React from 'react';
import { IconWhatsapp } from '../icons.js';
import { whatsappLink } from '../config.js';

export default function WhatsAppButton() {
  return React.createElement('a', {
    className: 'wa-float',
    href: whatsappLink('Hola, quiero información sobre una importación.'),
    target: '_blank',
    rel: 'noopener noreferrer',
    'aria-label': 'Escríbenos por WhatsApp',
  }, React.createElement(IconWhatsapp, null));
}
