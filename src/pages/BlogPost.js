import React from 'react';
import { Link } from '../router.js';
import { BLOG_POSTS } from '../data/blog.js';
import { whatsappLink } from '../config.js';
import { POST_ICONS } from '../data/blogIcons.js';
import { POST_IMAGES } from '../data/blogImages.js';
import { IconDocument } from '../icons.js';

function Block(block, i) {
  if (block.type === 'h3') return React.createElement('h3', { key: i, className: 'blog-h3' }, block.text);
  if (block.type === 'ul') return React.createElement('ul', { key: i, className: 'blog-ul' },
    block.items.map((item, j) => React.createElement('li', { key: j }, item)),
  );
  if (block.type === 'template') return React.createElement('div', { key: i, className: 'blog-template' },
    React.createElement('div', { className: 'blog-template-title' }, block.title),
    React.createElement('pre', null, block.text),
  );
  return React.createElement('p', { key: i, className: 'blog-p' }, block.text);
}

export default function BlogPost({ slug }) {
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return React.createElement('section', { className: 'section', style: { paddingTop: 92, paddingBottom: 92 } },
      React.createElement('div', { className: 'wrap' },
        React.createElement('h1', { className: 'page-title' }, 'Artículo no encontrado'),
        React.createElement(Link, { to: '/blog', className: 'link-underline' }, '← Volver al blog'),
      ),
    );
  }

  const PostIcon = POST_ICONS[post.slug] || IconDocument;
  const image = POST_IMAGES[post.slug];

  return React.createElement(React.Fragment, null,
    React.createElement('section', {
      className: 'page-banner',
      style: { backgroundImage: `url('${image}')`, paddingBottom: 76 },
    },
      React.createElement('div', { className: 'wrap' },
        React.createElement(Link, { to: '/blog', className: 'link-underline', style: { color: '#9BE6AC', borderColor: '#9BE6AC' } }, '← Blog'),
        React.createElement('span', { className: 'blog-cover blog-cover-lg' }, React.createElement(PostIcon, { size: 30, stroke: '#0D2637', strokeWidth: 1.4 })),
        React.createElement('h1', { className: 'page-title', style: { marginTop: 20, maxWidth: 780 } }, post.title),
      ),
    ),

    React.createElement('section', { className: 'px-60', style: { paddingBottom: 92 } },
      React.createElement('div', { className: 'wrap blog-article', style: { padding: 0 } },
        post.body.map(Block),
      ),
    ),

    React.createElement('section', { className: 'final-cta' },
      React.createElement('div', { className: 'wrap' },
        React.createElement('div', null,
          React.createElement('h2', null, '¿Tienes una duda sobre tu caso?'),
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
