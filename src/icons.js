import React from 'react';

// Ícono genérico: recibe el contenido interno del <svg> como string estático (confiable, definido en este archivo).
function Icon({ paths, size = 24, stroke = '#0D2637', fill = 'none', viewBox = '0 0 24 24', strokeWidth = 1.5, style }) {
  return React.createElement('svg', {
    width: size,
    height: size,
    viewBox,
    fill,
    stroke,
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
    style,
    dangerouslySetInnerHTML: { __html: paths },
  });
}


export const IconCustoms = (props) => Icon({ ...props, paths: '<path d="M3 8l9-5 9 5v8l-9 5-9-5V8z"/><path d="M3 8l9 5 9-5"/><path d="M12 13v8"/>' });
export const IconTrade = (props) => Icon({ ...props, paths: '<rect x="3" y="7" width="18" height="12"/><path d="M3 11h18"/><path d="M8 7V5h8v2"/>' });
export const IconLogistics = (props) => Icon({ ...props, paths: '<path d="M2 16V8h11v8H2z"/><path d="M13 11h4l4 3v2h-8"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>' });
export const IconAdvice = (props) => Icon({ ...props, paths: '<path d="M5 4h11l4 4v12H5V4z"/><path d="M15 4v5h5"/><path d="M9 13h6M9 17h6"/>' });
export const IconShield = (props) => Icon({ ...props, paths: '<path d="M12 3l8 3v6c0 4.4-3.3 7.9-8 9-4.7-1.1-8-4.6-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/>' });
export const IconCheck = (props) => Icon({ ...props, paths: '<path d="M20 6L9 17l-5-5"/>' });
export const IconMenu = (props) => Icon({ ...props, paths: '<path d="M4 7h16M4 12h16M4 17h16"/>' });
export const IconStar = ({ size = 17, filled = true }) =>
  React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: filled ? '#35A94C' : 'none', stroke: filled ? 'none' : '#35A94C' },
    React.createElement('path', { d: 'M12 2l3 6.6 7 .8-5.2 4.8 1.4 7L12 17.8 5.8 21.2l1.4-7L2 9.4l7-.8L12 2z' })
  );

export const IconWhatsapp = ({ size = 28, color = '#FFFFFF' }) =>
  React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: color, 'aria-hidden': 'true' },
    React.createElement('path', {
      d: 'M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1112 20zm4.4-5.8c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 01-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.1-.3 0-.5l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.9 4.5 3.9 1.6.6 2.2.7 2.9.6.5-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.4-.2z',
    })
  );

export const IconPackage = (props) => Icon({ ...props, paths: '<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/>' });
export const IconFacebook = (props) => Icon({ ...props, paths: '<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>' });
export const IconInstagram = (props) => Icon({ ...props, paths: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/>' });
export const IconMail = (props) => Icon({ ...props, paths: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>' });

// ===== Íconos adicionales: Nosotros, FAQ, Foro, Blog =====
export const IconCompass = (props) => Icon({ ...props, paths: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z"/>' });
export const IconGem = (props) => Icon({ ...props, paths: '<path d="M6 3h12l4 6-10 12L2 9l4-6z"/><path d="M2 9h20M9 3l3 6-3 12M15 3l-3 6 3 12"/>' });
export const IconEye = (props) => Icon({ ...props, paths: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>' });
export const IconClock = (props) => Icon({ ...props, paths: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>' });
export const IconFlagCheck = (props) => Icon({ ...props, paths: '<path d="M5 3v18"/><path d="M5 4h13l-3 4 3 4H5"/>' });
export const IconInvoice = (props) => Icon({ ...props, paths: '<path d="M6 2h9l3 3v17H6V2z"/><path d="M15 2v3h3"/><path d="M9 11h6M9 14.5h6M9 18h3"/>' });
export const IconChat = (props) => Icon({ ...props, paths: '<path d="M4 4h16v12H9l-4 4.5V4z"/><path d="M8 9h8M8 12.5h5"/>' });
export const IconDocument = (props) => Icon({ ...props, paths: '<path d="M6 2h9l3 3v17H6V2z"/><path d="M15 2v3h3"/><path d="M9 12h6M9 16h6M9 8h3"/>' });
export const IconGlobe = (props) => Icon({ ...props, paths: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.4 2.5 3.8 5.6 3.8 9s-1.4 6.5-3.8 9c-2.4-2.5-3.8-5.6-3.8-9s1.4-6.5 3.8-9z"/>' });
export const IconPercent = (props) => Icon({ ...props, paths: '<line x1="5" y1="19" x2="19" y2="5"/><circle cx="7.5" cy="7.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/>' });
export const IconLock = (props) => Icon({ ...props, paths: '<rect x="5" y="11" width="14" height="9" rx="1"/><path d="M8 11V7a4 4 0 018 0v4"/>' });
export const IconCalculator = (props) => Icon({ ...props, paths: '<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M8 7.5h8"/><path d="M8 12h2M12 12h2M16 12v6M8 16h2M12 16h2"/>' });
export const IconBuilding = (props) => Icon({ ...props, paths: '<rect x="4" y="3" width="10" height="18"/><rect x="14" y="9" width="6" height="12"/><path d="M7 7h1M10 7h1M7 11h1M10 11h1M7 15h1M10 15h1"/>' });
export const IconScale = (props) => Icon({ ...props, paths: '<path d="M12 3v18"/><path d="M5 7h14"/><path d="M5 7l-3.2 6.2a3.2 3.2 0 006.4 0L5 7z"/><path d="M19 7l-3.2 6.2a3.2 3.2 0 006.4 0L19 7z"/>' });
