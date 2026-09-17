import React, { useState } from 'react';
import { Link, navigate } from '../router.js';
import { IconMenu } from '../icons.js';
import { SITE } from '../config.js';
import SocialLinks from './SocialLinks.js';

function Brand() {
  return React.createElement(Link, { to: '/', className: 'brand' },
    React.createElement('img', { src: './assets/logo-dark.png', alt: SITE.name, className: 'brand-logo' }),
  );
}

function goToHomeSection(id) {
  return (e) => {
    e.preventDefault();
    const isHome = (window.location.hash.replace(/^#/, '') || '/') === '/';
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  };
}

export default function Header({ route }) {
  const [open, setOpen] = useState(false);
  const isServicios = route === '/servicios';
  const isForo = route === '/foro';
  const isFaq = route === '/preguntas-frecuentes';
  const isNosotros = route === '/nosotros';

  const navLinks = React.createElement(React.Fragment, null,
    React.createElement(Link, { to: '/servicios', className: isServicios ? 'active' : '' }, 'Servicios'),
    React.createElement(Link, { to: '/foro', className: isForo ? 'active' : '' }, 'Foro'),
    React.createElement(Link, { to: '/preguntas-frecuentes', className: isFaq ? 'active' : '' }, 'Preguntas frecuentes'),
    React.createElement('a', { href: '#cobertura', onClick: goToHomeSection('cobertura') }, 'Cobertura'),
    React.createElement('a', { href: '#recursos', onClick: goToHomeSection('recursos') }, 'Recursos'),
    React.createElement(Link, { to: '/nosotros', className: isNosotros ? 'active' : '' }, 'Nosotros'),
    React.createElement('a', { href: '#cotizar', className: 'btn btn-primary', onClick: goToHomeSection('cotizar') }, 'Cotizar'),
  );

  return React.createElement('header', null,
    React.createElement('div', { className: 'topbar' },
      React.createElement('div', { className: 'wrap' },
        React.createElement('div', null,
          React.createElement('span', null, `${SITE.city} · ${SITE.customsOffice}`),
        ),
        React.createElement('div', { className: 'topbar-right' },
          React.createElement('span', null, SITE.phoneDisplay),
          React.createElement('span', { className: 'topbar-sep' }, '|'),
          React.createElement('span', null, SITE.email),
          React.createElement('span', { className: 'topbar-sep' }, '|'),
          React.createElement(SocialLinks, { size: 15 }),
        ),
      ),
    ),
    React.createElement('div', { className: 'site-header' },
      React.createElement('div', { className: 'wrap' },
        React.createElement(Brand, null),
        React.createElement('nav', { className: 'nav' }, navLinks),
        React.createElement('button', {
          className: 'nav-toggle',
          'aria-label': 'Abrir menú',
          onClick: () => setOpen((v) => !v),
        }, React.createElement(IconMenu, { stroke: '#FFFFFF', size: 24 })),
      ),
      open && React.createElement('div', { className: 'wrap mobile-nav' }, navLinks),
    ),
  );
}
