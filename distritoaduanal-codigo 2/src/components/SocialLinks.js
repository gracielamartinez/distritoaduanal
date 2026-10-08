import React from 'react';
import { IconFacebook, IconInstagram, IconWhatsapp, IconMail } from '../icons.js';
import { SITE, whatsappLink } from '../config.js';

export default function SocialLinks({ size = 18, className = '' }) {
  const links = [
    { href: SITE.facebookUrl, label: 'Facebook', Icon: IconFacebook },
    { href: SITE.instagramUrl, label: 'Instagram', Icon: IconInstagram },
    { href: whatsappLink(), label: 'WhatsApp', Icon: IconWhatsapp },
    { href: `mailto:${SITE.email}`, label: 'Correo', Icon: IconMail },
  ];

  return React.createElement('div', { className: `social-links ${className}`.trim() },
    links.map(({ href, label, Icon }) => React.createElement('a', {
      key: label,
      href,
      target: href.startsWith('mailto:') ? undefined : '_blank',
      rel: href.startsWith('mailto:') ? undefined : 'noopener noreferrer',
      'aria-label': label,
      className: 'social-link',
    }, Icon === IconWhatsapp
      ? React.createElement(Icon, { size, color: 'currentColor' })
      : React.createElement(Icon, { size, stroke: 'currentColor', strokeWidth: 1.6 }),
    )),
  );
}
