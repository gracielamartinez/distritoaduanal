import React from 'react';
import { Link } from '../router.js';
import { BLOG_POSTS } from '../data/blog.js';
import { whatsappLink } from '../config.js';
import { POST_ICONS } from '../data/blogIcons.js';
import { POST_IMAGES } from '../data/blogImages.js';
import { IconDocument } from '../icons.js';

function PostCard({ slug, title, excerpt }) {
  const PostIcon = POST_ICONS[slug] || IconDocument;
  const image = POST_IMAGES[slug];
  return React.createElement(Link, { to: `/blog/${slug}`, className: 'blog-card' },
    React.createElement('div', { className: 'blog-card-photo', style: { backgroundImage: `url('${image}')` } },
      React.createElement('span', { className: 'blog-cover' }, React.createElement(PostIcon, { size: 22, stroke: '#0D2637', strokeWidth: 1.5 })),
    ),
    React.createElement('div', { className: 'blog-card-body' },
      React.createElement('h3', null, title),
      React.createElement('p', null, excerpt),
      React.createElement('span', { className: 'link-underline' }, 'Leer más →'),
    ),
  );
}

export default function Blog() {
  return React.createElement(React.Fragment, null,

    React.createElement('section', { className: 'section', style: { paddingTop: 92, paddingBottom: 60 } },
      React.createElement('div', { className: 'wrap' },
        React.createElement('div', { className: 'eyebrow' }, 'Recursos'),
        React.createElement('h1', { className: 'page-title' }, 'Blog'),
        React.createElement('p', { style: { color: '#4A5250', fontSize: 18, lineHeight: 1.65, maxWidth: 720 } },
          'Guías prácticas de comercio exterior, escritas en español de verdad — sin tecnicismos innecesarios.',
        ),
      ),
    ),

    React.createElement('section', { className: 'px-60', style: { paddingBottom: 92 } },
      React.createElement('div', { className: 'wrap', style: { padding: 0 } },
        React.createElement('div', { className: 'blog-grid' },
          BLOG_POSTS.map((p) => React.createElement(PostCard, { key: p.slug, ...p })),
        ),
      ),
    ),

    React.createElement('section', { className: 'final-cta' },
      React.createElement('div', { className: 'wrap' },
        React.createElement('div', null,
          React.createElement('h2', null, '¿Tienes una duda que no cubrimos aquí?'),
          React.createElement('p', null, 'Escríbenos por WhatsApp y con gusto te ayudamos.'),
        ),
        React.createElement('a', {
          className: 'btn btn-dark', href: whatsappLink('Hola, tengo una duda sobre comercio exterior.'),
          target: '_blank', rel: 'noopener noreferrer',
        }, 'Escríbenos por WhatsApp'),
      ),
    ),
  );
}
