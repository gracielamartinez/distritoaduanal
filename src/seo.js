import { BLOG_POSTS } from './data/blog.js';
import { POST_IMAGES } from './data/blogImages.js';
import { toHref } from './router.js';

// Título, descripción y vista previa (Google, WhatsApp, Facebook) de cada
// página. Al entrar directo a una URL, esto ya viene escrito en el HTML que
// genera scripts/build.py a partir de los mismos datos (content/pages.json y
// content/blog.json); aquí solo se actualiza al navegar dentro del sitio.
const SUFFIX = ' | Distrito Aduanal';
const DEFAULT_IMAGE = '/assets/photos/banner-containers.jpg';
let PAGES = {};

export async function hydratePages() {
  try {
    const res = await fetch('/content/pages.json');
    if (res.ok) PAGES = (await res.json()).pages || {};
  } catch (e) {
    // Sin content/pages.json: se conserva lo que ya trae el HTML.
  }
}

function metaFor(route) {
  const post = route.startsWith('/blog/') && BLOG_POSTS.find((p) => `/blog/${p.slug}` === route);
  if (post) {
    return { title: post.title + SUFFIX, description: post.excerpt, image: (POST_IMAGES[post.slug] || '').replace(/\.webp$/, '.jpg'), type: 'article' };
  }
  return PAGES[route] || PAGES['/'];
}

function setTag(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el && value) el.setAttribute(attr, value);
}

export function applyMeta(route) {
  const meta = metaFor(route);
  if (!meta) return;
  const url = window.location.origin + toHref(route);
  const image = window.location.origin + (meta.image || DEFAULT_IMAGE);
  document.title = meta.title;
  setTag('meta[name="description"]', 'content', meta.description);
  setTag('link[rel="canonical"]', 'href', url);
  setTag('meta[property="og:title"]', 'content', meta.title);
  setTag('meta[property="og:description"]', 'content', meta.description);
  setTag('meta[property="og:url"]', 'content', url);
  setTag('meta[property="og:image"]', 'content', image);
  setTag('meta[property="og:type"]', 'content', meta.type || 'website');
}
