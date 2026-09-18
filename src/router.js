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

// Empareja una ruta como "/blog/mi-articulo" contra un patrón "/blog/:slug"
// y devuelve { slug: "mi-articulo" }, o null si no coincide.
export function matchRoute(pattern, route) {
  const patternParts = pattern.split('/').filter(Boolean);
  const routeParts = route.split('/').filter(Boolean);
  if (patternParts.length !== routeParts.length) return null;
  const params = {};
  for (let i = 0; i < patternParts.length; i++) {
    const p = patternParts[i];
    if (p.startsWith(':')) {
      params[p.slice(1)] = decodeURIComponent(routeParts[i]);
    } else if (p !== routeParts[i]) {
      return null;
    }
  }
  return params;
}

export function Link({ to, className, children, onClick, ...rest }) {
  const handleClick = useCallback((e) => {
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  }, [to, onClick]);
  return React.createElement('a', { href: `#${to}`, className, onClick: handleClick, ...rest }, children);
}
