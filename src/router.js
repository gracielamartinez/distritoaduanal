import React, { useEffect, useState, useCallback } from 'react';

// Enrutador de hash minimalista (sin dependencias): funciona en cualquier
// alojamiento de archivos estáticos, sin configuración especial del servidor.
function currentHash() {
  const h = window.location.hash.replace(/^#/, '');
  return h || '/';
}

export function useRoute() {
  const [route, setRoute] = useState(currentHash());
  useEffect(() => {
    const onHashChange = () => setRoute(currentHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  return route;
}

export function navigate(path) {
  window.location.hash = path;
  window.scrollTo({ top: 0, behavior: 'instant' in window.scrollTo ? 'instant' : 'auto' });
}

export function Link({ to, className, children, onClick, ...rest }) {
  const handleClick = useCallback((e) => {
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  }, [to, onClick]);
  return React.createElement('a', { href: `#${to}`, className, onClick: handleClick, ...rest }, children);
}
