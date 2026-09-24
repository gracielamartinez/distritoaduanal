import React, { useEffect, useState, useCallback } from 'react';

// Enrutador minimalista (sin dependencias) con URLs reales: /blog/mi-articulo/
// en lugar de #/blog/mi-articulo. Google ignora todo lo que va después de "#",
// así que con URLs de hash solo indexaba la página de inicio.
//
// Cada página existe como archivo (scripts/build.py genera
// blog/mi-articulo/index.html, etc.), y Netlify redirige /blog/mi-articulo a
// /blog/mi-articulo/ — por eso los enlaces siempre llevan la diagonal final.
// Internamente la ruta se maneja sin ella ("/blog/mi-articulo").
export function currentPath() {
  const p = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/+$/, '');
  return p || '/';
}

// Convierte una ruta interna en el enlace público, con diagonal final.
export function toHref(path) {
  const [pathname, hash] = path.split('#');
  const clean = pathname === '/' ? '/' : pathname.replace(/\/?$/, '/');
  return hash ? `${clean}#${hash}` : clean;
}

const ROUTE_EVENT = 'routechange';

export function useRoute() {
  const [route, setRoute] = useState(currentPath());
  useEffect(() => {
    const onChange = () => setRoute(currentPath());
    window.addEventListener('popstate', onChange);
    window.addEventListener(ROUTE_EVENT, onChange);
    return () => {
      window.removeEventListener('popstate', onChange);
      window.removeEventListener(ROUTE_EVENT, onChange);
    };
  }, []);
  return route;
}

export function navigate(path) {
  window.history.pushState({}, '', toHref(path));
  window.dispatchEvent(new Event(ROUTE_EVENT));
  window.scrollTo({ top: 0, behavior: 'instant' in window.scrollTo ? 'instant' : 'auto' });
}

// Los enlaces viejos (…/#/blog/mi-articulo) se siguen compartiendo por
// WhatsApp; se convierten a la URL nueva antes de pintar la app.
export function upgradeLegacyHashUrl() {
  const h = window.location.hash;
  if (h.startsWith('#/')) window.history.replaceState({}, '', toHref(h.slice(1) || '/'));
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
    // Ctrl/Cmd/Shift + clic o clic central: que el navegador abra otra pestaña.
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  }, [to, onClick]);
  return React.createElement('a', { href: toHref(to), className, onClick: handleClick, ...rest }, children);
}
