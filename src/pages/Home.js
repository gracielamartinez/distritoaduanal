import React, { useState } from 'react';
import { Link } from '../router.js';
import {
  IconCustoms, IconTrade, IconLogistics, IconAdvice, IconShield, IconStar,
} from '../icons.js';
import QuoteForm from '../components/QuoteForm.js';
import { whatsappLink, SITE } from '../config.js';

const AUDIENCE_TEXT = 'Acompañamos a personas físicas, emprendedores, pequeñas y grandes empresas en cada paso de su camino. Sabemos lo importante que es que tus productos lleguen seguros y a tiempo. Nos encargamos de agilizar toda tu logística, sin importar el volumen o el origen de tus cargas. Te acompañamos en cada etapa con una asesoría a tu medida y un equipo experto dedicado a cuidar de tu negocio.';

const SERVICES = [
  { Icon: IconCustoms, title: 'Agencia aduanal', text: 'Despacho de importación y exportación, clasificación y liberación de tu mercancía.' },
  { Icon: IconTrade, title: 'Comercializadora', text: '¿No tienes padrón de importadores? Importamos por ti, con todo en regla.' },
  { Icon: IconLogistics, title: 'Logística y fletes', text: 'Envíos nacionales e internacionales, venta de guías y coordinación puerta a puerta.' },
  { Icon: IconAdvice, title: 'Asesoría', text: 'Te decimos qué necesitas antes de comprar: permisos, normas e impuestos.' },
];

// Se calculan al momento de renderizar (no al importar el módulo) para que
// reflejen el contenido ya cargado desde content/site.json vía hydrateSite().
const getCoverage = () => [
  { k: 'Marítima', v: 'Progreso' },
  { k: 'Aérea', v: 'Mérida' },
  { k: 'Península', v: SITE.coveragePeninsulaOffice, placeholder: 'Aduana' },
  { k: 'Resto del país', v: 'Coordinamos' },
];

const getStats = () => [
  { value: SITE.stats.years, label: 'años acompañando importadores' },
  { value: SITE.stats.operations, label: 'operaciones realizadas' },
  { value: SITE.stats.customsOffices, label: 'aduanas donde operamos' },
  { value: SITE.stats.sectors, label: 'sectores atendidos' },
];

function ServiceCard({ Icon, title, text, to }) {
  const body = React.createElement(React.Fragment, null,
    React.createElement(Icon, { size: 30 }),
    React.createElement('h3', null, title),
    React.createElement('p', null, text),
  );
  if (to) return React.createElement(Link, { to, className: 'service-card', style: { display: 'block', color: 'inherit' } }, body);
  return React.createElement('div', { className: 'service-card' }, body);
}

function OperationBlock() {
  const [tab, setTab] = useState('single');
  return React.createElement('div', { className: 'op-block-outer' },
    React.createElement('div', { className: 'op-block' },
      React.createElement('div', { className: 'op-block-head' },
        React.createElement('h2', null, '¿Cómo es tu operación?'),
        React.createElement('p', null, 'Ajustamos el acompañamiento y la tarifa a lo que necesitas.'),
      ),
      React.createElement('div', { className: 'op-tabs' },
        React.createElement('button', {
          className: `op-tab ${tab === 'single' ? 'is-active' : ''}`,
          onClick: () => setTab('single'),
        }, 'Un envío puntual'),
        React.createElement('button', {
          className: `op-tab ${tab === 'recurring' ? 'is-active' : ''}`,
          onClick: () => setTab('recurring'),
        }, 'Una operación recurrente'),
      ),
      React.createElement('div', { className: 'op-body' },
        React.createElement('div', { className: 'op-body-text' },
          tab === 'single'
            ? React.createElement(React.Fragment, null,
                React.createElement('h3', null, 'Una sola operación, bien hecha'),
                React.createElement('p', null, 'Revisamos qué necesita tu producto, te damos el costo completo antes de que decidas y nos encargamos del resto.'),
                React.createElement('div', { className: 'steps' },
                  React.createElement(Step, { n: 1, bold: 'Nos cuentas qué quieres traer.', text: 'Con el producto y su origen, basta.' }),
                  React.createElement(Step, { n: 2, bold: 'Revisamos y te cotizamos.', text: 'Permisos, normas e impuestos, con el costo completo.' }),
                  React.createElement(Step, { n: 3, bold: 'Recibes tu mercancía.', text: 'Y te vamos contando en cada paso.' }),
                ),
              )
            : React.createElement(React.Fragment, null,
                React.createElement('h3', null, 'Comercio exterior, sin que te ocupe el día a día'),
                React.createElement('p', null, 'Te asignamos un contacto fijo, damos seguimiento a cada embarque y consolidamos la facturación del periodo que prefieras.'),
                React.createElement('div', { className: 'steps' },
                  React.createElement(Step, { n: 1, bold: 'Definimos el alcance.', text: 'Volumen, frecuencia y productos habituales.' }),
                  React.createElement(Step, { n: 2, bold: 'Fijamos una tarifa recurrente.', text: 'Previsible, sin cotizar cada vez desde cero.' }),
                  React.createElement(Step, { n: 3, bold: 'Operamos como tu equipo de comercio exterior.', text: 'Con reportes y un contacto directo.' }),
                ),
              ),
        ),
        React.createElement('div', { className: 'op-form' },
          React.createElement('div', { className: 'op-form-badge' }, 'Te respondemos el mismo día hábil'),
          React.createElement(QuoteForm, null),
        ),
      ),
    ),
  );
}

function Step({ n, bold, text }) {
  return React.createElement('div', { className: 'step' },
    React.createElement('span', { className: 'step-num' }, n),
    React.createElement('div', null,
      React.createElement('b', null, bold), ' ',
      React.createElement('span', { className: 'detail' }, text),
    ),
  );
}

export default function Home() {
  return React.createElement(React.Fragment, null,

    // ===== HERO =====
    React.createElement('section', { className: 'hero' },
      React.createElement('div', { className: 'wrap' },
        React.createElement('div', { className: 'hero-copy' },
          React.createElement('div', { className: 'eyebrow' }, 'Agencia aduanal y comercializadora'),
          React.createElement('h1', null, 'Que las fronteras no detengan tu negocio'),
          React.createElement('p', null, 'Te acompañamos en cada paso de tu importación o exportación, desde el primer correo a tu proveedor hasta que la mercancía llega a tu bodega.'),
          React.createElement('div', { className: 'hero-actions' },
            React.createElement(Link, { to: '/servicios', className: 'btn btn-outline-light' }, 'Ver servicios'),
          ),
        ),
        React.createElement('div', { className: 'hero-form', id: 'cotizar' }, React.createElement(HeroForm, null)),
      ),
    ),

    // ===== HACEMOS EQUIPO CONTIGO =====
    React.createElement('section', { className: 'what-is', style: { paddingTop: 92 } },
      React.createElement('div', { className: 'what-is-inner' },
        React.createElement('h2', null, 'Hacemos equipo contigo'),
        React.createElement('p', null, 'El comercio exterior puede sentirse como un idioma que nadie te enseñó. Nosotros lo hablamos perfecto — te aseguramos acompañarte hasta que tú también lo entiendas.'),
        React.createElement('div', { className: 'callout' },
          React.createElement('p', null, 'En Distrito Aduanal hacemos equipo contigo. Te explicamos cada paso antes de darlo. Te decimos qué va a costar antes de que decidas. Y nos quedamos contigo hasta que tu mercancía llegue a donde tiene que llegar.'),
          React.createElement('div', { className: 'title', style: { marginTop: 14 } }, 'Sin tecnicismos innecesarios. Sin sorpresas al final.'),
        ),
      ),
    ),

    // ===== ¿PARA QUIÉN? =====
    React.createElement('section', { className: 'what-is' },
      React.createElement('div', { className: 'what-is-inner' },
        React.createElement('h2', null, '¿Para quién?'),
        React.createElement('p', null, AUDIENCE_TEXT),
      ),
    ),

    // ===== SERVICIOS =====
    React.createElement('section', { className: 'section' },
      React.createElement('div', { className: 'wrap' },
        React.createElement('h2', null, 'Cuatro formas de trabajar contigo'),
        React.createElement('p', { className: 'section-lead' }, 'Desde una sola operación hasta el manejo completo de tu comercio exterior.'),
        React.createElement('div', { className: 'services-grid' },
          SERVICES.map((s) => React.createElement(ServiceCard, { key: s.title, ...s })),
        ),
        React.createElement(Link, { to: '/servicios', className: 'link-underline', style: { display: 'inline-block', marginTop: 40 } }, 'Ver catálogo completo de servicios →'),
      ),
    ),

    // ===== ¿CÓMO ES TU OPERACIÓN? =====
    React.createElement('div', { id: 'operacion' }, React.createElement(OperationBlock, null)),

    // ===== COBERTURA =====
    React.createElement('section', { className: 'coverage', id: 'cobertura' },
      React.createElement('div', { className: 'wrap-flex' },
        React.createElement('div', { className: 'coverage-copy' },
          React.createElement('div', { className: 'eyebrow' }, 'Cobertura'),
          React.createElement('h2', null, 'Estamos donde tu mercancía llega'),
          React.createElement('p', null, `Operamos desde ${SITE.city}, con presencia en el puerto de Progreso. Conocemos a la gente y los tiempos de cada punto — y eso se nota cuando algo hay que resolver rápido.`),
          React.createElement('p', { className: 'faint' }, 'Si tu operación entra por otra aduana del país, también la coordinamos.'),
        ),
        React.createElement('div', { className: 'coverage-grid' },
          getCoverage().map((c) => React.createElement('div', { className: 'coverage-cell', key: c.k },
            React.createElement('div', { className: 'k' }, c.k),
            React.createElement('div', { className: 'v' }, c.v || React.createElement('span', { className: 'fill-me' }, c.placeholder)),
          )),
        ),
      ),
    ),

    // ===== CIFRAS =====
    React.createElement('section', { className: 'stats-outer' },
      React.createElement('div', { className: 'stats' },
        getStats().map((s) => React.createElement('div', { className: 'stat', key: s.label },
          React.createElement('div', { className: 'num' }, s.value || React.createElement('span', { className: 'fill-me' }, 'X')),
          React.createElement('div', { className: 'label' }, s.label),
        )),
      ),
    ),

    // ===== SIN COSTOS SORPRESA =====
    React.createElement('section', { className: 'banner-outer' },
      React.createElement('div', { className: 'banner' },
        React.createElement(IconShield, { size: 56, stroke: '#1F6B32', strokeWidth: 1.4 }),
        React.createElement('div', { className: 'banner-text' },
          React.createElement('h2', null, 'Sin costos sorpresa'),
          React.createElement('p', null, 'Sabes todo lo que va a costar antes de empezar. Si algo cambia, nos aseguramos de avisarte en el momento — no en la factura final.'),
        ),
      ),
    ),

    // ===== GUÍA + RESEÑAS =====
    React.createElement('section', { className: 'gr-outer', id: 'recursos' },
      React.createElement('div', { className: 'gr-grid' },
        React.createElement(GuideCard, null),
        React.createElement(ReviewCard, null),
      ),
      React.createElement('div', { className: 'wrap', style: { padding: 0, display: 'flex', gap: 28, flexWrap: 'wrap', marginTop: 28 } },
        React.createElement(Link, { to: '/preguntas-frecuentes', className: 'link-underline' }, 'Preguntas frecuentes →'),
        React.createElement(Link, { to: '/foro', className: 'link-underline' }, 'Foro →'),
      ),
    ),

    // ===== CTA FINAL =====
    React.createElement('section', { className: 'final-cta' },
      React.createElement('div', { className: 'wrap' },
        React.createElement('div', null,
          React.createElement('h2', null, 'Cuéntanos qué quieres traer'),
          React.createElement('p', null, 'Sin compromiso, y te respondemos el mismo día hábil.'),
        ),
        React.createElement('div', { className: 'final-cta-actions' },
          React.createElement('a', {
            className: 'btn btn-dark', href: whatsappLink('Hola, quiero información sobre una importación.'),
            target: '_blank', rel: 'noopener noreferrer',
          }, 'Escríbenos por WhatsApp'),
          React.createElement('a', { className: 'btn btn-outline-dark', href: SITE.phoneHref }, 'Llamar ahora'),
        ),
      ),
    ),
  );
}

function HeroForm() {
  const [producto, setProducto] = useState('');
  const [origen, setOrigen] = useState('');
  const [tel, setTel] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const lines = [
      'Hola, quiero que me asesoren.',
      producto ? `Producto: ${producto}` : null,
      origen ? `Desde: ${origen}` : null,
      tel ? `Mi WhatsApp: ${tel}` : null,
    ].filter(Boolean);
    window.open(whatsappLink(lines.join('\n')), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return React.createElement('div', { className: 'op-form hero-form-card' },
    React.createElement('div', { className: 'op-form-badge' }, 'Te respondemos el mismo día hábil'),
    sent
      ? React.createElement('p', { style: { color: '#1F6B32', fontWeight: 600 } }, '¡Gracias! Se abrió WhatsApp con tu mensaje listo para enviar.')
      : React.createElement('form', { className: 'form-fields', onSubmit: handleSubmit },
          React.createElement('input', { type: 'text', placeholder: '¿Qué quieres traer?', value: producto, onChange: (e) => setProducto(e.target.value) }),
          React.createElement('input', { type: 'text', placeholder: '¿Desde dónde?', value: origen, onChange: (e) => setOrigen(e.target.value) }),
          React.createElement('input', { type: 'tel', placeholder: 'Tu WhatsApp', value: tel, onChange: (e) => setTel(e.target.value) }),
          React.createElement('button', { type: 'submit', className: 'form-submit' }, 'Quiero que me asesoren'),
        ),
  );
}

function GuideCard() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    window.open(whatsappLink(`Hola, quiero la Guía Maestra. Mi correo es: ${email}`), '_blank', 'noopener,noreferrer');
    setSent(true);
  };
  return React.createElement('div', { className: 'card guide-card' },
    React.createElement('div', { className: 'guide-head' },
      React.createElement('div', { className: 'guide-badge' }, React.createElement('span', null, 'La Guía', React.createElement('br'), 'Maestra')),
      React.createElement('div', null,
        React.createElement('h3', null, '¿Vas a importar por primera vez?'),
        React.createElement('p', null, 'Te regalamos nuestra guía: quién es quién en una operación, qué se paga y qué documentos necesitas. 45 páginas, en español de verdad.'),
      ),
    ),
    sent
      ? React.createElement('p', { style: { color: '#1F6B32', fontWeight: 600 } }, '¡Listo! Te escribimos por WhatsApp para enviártela.')
      : React.createElement('form', { className: 'guide-form', onSubmit: handleSubmit },
          React.createElement('input', { type: 'email', placeholder: 'Tu correo', value: email, onChange: (e) => setEmail(e.target.value), required: true }),
          React.createElement('button', { type: 'submit', className: 'btn btn-primary' }, 'Enviármela'),
        ),
  );
}

function ReviewCard() {
  const { count, quote, author } = SITE.review;
  return React.createElement('div', { className: 'card' },
    React.createElement('div', { className: 'review-head' },
      React.createElement('div', { className: 'stars' }, [0, 1, 2, 3, 4].map((i) => React.createElement(IconStar, { key: i }))),
      React.createElement('span', { className: 'review-count' }, count || React.createElement('span', { className: 'fill-me' }, 'X'), ' reseñas en Google'),
    ),
    React.createElement('p', { className: 'review-quote' }, quote || React.createElement('span', { className: 'fill-me' }, 'Reseña real de un cliente — qué necesitaba, qué resolvimos y cómo se sintió el acompañamiento.')),
    React.createElement('div', { className: 'review-author' }, author || React.createElement('span', { className: 'fill-me' }, 'Nombre del cliente · Empresa')),
    React.createElement('div', { className: 'review-link' }, 'Ver todas en Google →'),
  );
}
