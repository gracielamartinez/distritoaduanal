import React, { useState } from 'react';
import { Link } from '../router.js';
import {
  IconCustoms, IconTrade, IconLogistics, IconAdvice, IconGem,
} from '../icons.js';
import { VALUE_PROPOSITION } from './Nosotros.js';
import QuoteForm from '../components/QuoteForm.js';
import PhoneField from '../components/PhoneField.js';
import { COUNTRIES } from '../data/countries.js';
import { whatsappLink, sendFormByEmail, SITE } from '../config.js';

const AUDIENCE_TEXT = 'Acompañamos a personas físicas, emprendedores, pequeñas y grandes empresas en cada paso de su camino. Sabemos lo importante que es que tus productos lleguen seguros y a tiempo. Nos encargamos de agilizar toda tu logística, sin importar el volumen o el origen de tus cargas. Te acompañamos en cada etapa con una asesoría a tu medida y un equipo experto dedicado a cuidar de tu negocio.';

const SERVICES = [
  { Icon: IconCustoms, title: 'Despacho aduanal', text: 'Despacho de importación y exportación, clasificación y liberación de tu mercancía.' },
  { Icon: IconTrade, title: 'Comercializadora', text: '¿No tienes padrón de importadores? Importamos por ti, con todo en regla.' },
  { Icon: IconLogistics, title: 'Logística y fletes', text: 'Envíos nacionales e internacionales, venta de guías y coordinación puerta a puerta.' },
  { Icon: IconAdvice, title: 'Asesoría', text: 'Te decimos qué necesitas antes de comprar: permisos, normas e impuestos.' },
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
      React.createElement(HeroDeco, null),
      React.createElement('div', { className: 'wrap' },
        React.createElement('div', { className: 'hero-copy' },
          React.createElement('div', { className: 'eyebrow' }, 'Comercializadora aduanal y logística de comercio exterior'),
          React.createElement('h1', null, 'Que las fronteras no detengan tu negocio'),
          React.createElement('p', null, 'Te acompañamos en cada paso de tu importación o exportación en México: despacho aduanal, clasificación arancelaria y logística, desde el primer correo a tu proveedor hasta que la mercancía llega a tu bodega.'),
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
        React.createElement(SectionAccent, null),
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
        React.createElement('p', { className: 'section-lead' }, 'Despacho aduanal, comercializadora, logística internacional y asesoría en comercio exterior — desde una sola operación hasta el manejo completo de tus importaciones y exportaciones.'),
        React.createElement('div', { className: 'services-grid' },
          SERVICES.map((s) => React.createElement(ServiceCard, { key: s.title, ...s })),
        ),
        React.createElement(Link, { to: '/servicios', className: 'link-underline', style: { display: 'inline-block', marginTop: 40 } }, 'Ver catálogo completo de servicios →'),
      ),
    ),

    // ===== BANNER CON FOTO =====
    React.createElement('section', {
      className: 'photo-banner',
      style: { backgroundImage: "url('/assets/photos/banner-containers.webp')" },
    },
      React.createElement('div', { className: 'photo-banner-inner' },
        React.createElement('h2', null, 'Conectamos tu negocio con el mundo, aduana por aduana'),
        React.createElement('p', null, 'Desde el contenedor hasta el pedimento, nos encargamos de que tu mercancía cruce la frontera sin contratiempos.'),
      ),
    ),

    // ===== ¿CÓMO ES TU OPERACIÓN? =====
    React.createElement('div', { id: 'operacion' }, React.createElement(OperationBlock, null)),

    // ===== PROPUESTA DE VALOR =====
    React.createElement('section', { className: 'banner-outer' },
      React.createElement('div', { className: 'banner' },
        React.createElement(IconGem, { size: 56, stroke: '#1F6B32', strokeWidth: 1.4 }),
        React.createElement('div', { className: 'banner-text' },
          React.createElement('h2', null, 'Nuestra propuesta de valor'),
          React.createElement('p', null, VALUE_PROPOSITION),
        ),
      ),
    ),

    // ===== RECURSOS =====
    React.createElement('section', { className: 'gr-outer', id: 'recursos' },
      React.createElement('div', { className: 'wrap', style: { padding: 0, display: 'flex', gap: 28, flexWrap: 'wrap' } },
        React.createElement(Link, { to: '/preguntas-frecuentes', className: 'link-underline' }, 'Preguntas frecuentes →'),
        React.createElement(Link, { to: '/foro', className: 'link-underline' }, 'Foro →'),
        React.createElement(Link, { to: '/blog', className: 'link-underline' }, 'Blog →'),
      ),
    ),

    // ===== CTA FINAL =====
    React.createElement('section', { className: 'final-cta' },
      React.createElement('div', { className: 'wrap' },
        React.createElement('div', null,
          React.createElement('h2', null, 'Cuéntanos qué quieres traer'),
          React.createElement('p', null, 'Sin compromiso. Te ayudamos a resolverlo por WhatsApp o llamada.'),
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

// Gráfico decorativo del hero: formas abstractas en los tonos de marca,
// puramente visual (aria-hidden), detrás del copy y el formulario.
function HeroDeco() {
  return React.createElement('svg', {
    className: 'hero-deco', viewBox: '0 0 600 480', 'aria-hidden': 'true', preserveAspectRatio: 'xMaxYMid slice',
  },
    React.createElement('circle', { cx: 520, cy: 90, r: 160, fill: 'none', stroke: '#375A6B', strokeWidth: 1 }),
    React.createElement('circle', { cx: 560, cy: 340, r: 110, fill: 'none', stroke: '#2C4C5C', strokeWidth: 1 }),
    React.createElement('circle', { cx: 470, cy: 360, r: 6, fill: '#35A94C' }),
    React.createElement('circle', { cx: 560, cy: 150, r: 4, fill: '#35A94C', opacity: 0.7 }),
    React.createElement('circle', { cx: 420, cy: 60, r: 3, fill: '#B9C2BF', opacity: 0.5 }),
    React.createElement('path', { d: 'M380 420 Q470 360 600 380', fill: 'none', stroke: '#2C4C5C', strokeWidth: 1, strokeDasharray: '2 6' }),
  );
}

// Acento decorativo sobre un título de sección: tres puntos en los tonos
// de marca, para introducir la sección sin depender solo de texto.
function SectionAccent() {
  return React.createElement('svg', {
    width: 46, height: 10, viewBox: '0 0 46 10', 'aria-hidden': 'true', style: { margin: '0 auto 18px' },
  },
    React.createElement('circle', { cx: 5, cy: 5, r: 5, fill: '#35A94C' }),
    React.createElement('circle', { cx: 23, cy: 5, r: 3.5, fill: '#268039' }),
    React.createElement('circle', { cx: 39, cy: 5, r: 2, fill: '#B9C2BF' }),
  );
}

const VALOR_OPTIONS = [
  'Menos de $50,000 MXN',
  '$50,000 – $200,000 MXN',
  '$200,000 – $500,000 MXN',
  '$500,000 – $1,000,000 MXN',
  'Más de $1,000,000 MXN',
];

function encodeFormData(data) {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&');
}

function HeroForm() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [producto, setProducto] = useState('');
  const [origen, setOrigen] = useState('');
  const [aduanaDestino, setAduanaDestino] = useState('');
  const [valorMercancia, setValorMercancia] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const telFull = `${country[1]} ${tel}`;
  const whatsappMessage = () => [
    `Hola, soy ${nombre} ${apellido}.`,
    'Quiero solicitar información.',
    producto ? `Producto: ${producto}` : null,
    origen ? `Origen / ubicación de la mercancía: ${origen}` : null,
    aduanaDestino ? `Aduana de destino: ${aduanaDestino}` : null,
    valorMercancia ? `Valor aproximado: ${valorMercancia}` : null,
    mensaje ? mensaje : null,
    `Correo: ${email}`,
    `Teléfono: ${telFull}`,
  ].filter(Boolean).join('\n');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (!nombre.trim() || !apellido.trim() || !email.trim() || !tel.trim()) {
      setError('Completa los campos marcados con *.');
      setStatus('error');
      return;
    }
    setStatus('sending');
    setError('');

    // Copia de respaldo en Netlify Forms (panel de Netlify > Forms).
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeFormData({
        'form-name': 'cotizacion-hero',
        nombre, apellido, email, telefono: telFull, producto, origen,
        aduanaDestino, valorMercancia, mensaje,
      }),
    }).catch(() => {});

    try {
      await sendFormByEmail(`Nueva solicitud de información — ${nombre} ${apellido}`, {
        'Nombre': `${nombre} ${apellido}`,
        'Correo': email,
        'Teléfono': telFull,
        'Producto a importar': producto || '—',
        'Origen': origen || '—',
        'Aduana destino': aduanaDestino || '—',
        'Valor aproximado': valorMercancia || '—',
        'Mensaje': mensaje || '—',
        // FormSubmit pone su propia hora al pie del correo, siempre en UTC.
        'Fecha y hora': new Date().toLocaleString('es-MX', {
          timeZone: 'America/Merida', dateStyle: 'full', timeStyle: 'short',
        }) + ' (hora de Mérida)',
      });
      setStatus('sent');
    } catch (err) {
      setError('No pudimos enviar tu solicitud. Inténtalo de nuevo o escríbenos por WhatsApp.');
      setStatus('error');
    }
  };

  return React.createElement('div', { className: 'op-form hero-form-card' },
    status === 'sent'
      ? React.createElement('div', null,
          React.createElement('p', { style: { color: '#1F6B32', fontWeight: 600 } }, '¡Gracias! Recibimos tu solicitud y te contactaremos muy pronto.'),
          React.createElement('a', {
            className: 'link-underline', href: whatsappLink(whatsappMessage()),
            target: '_blank', rel: 'noopener noreferrer', style: { display: 'inline-block', marginTop: 10 },
          }, '¿Lo necesitas ya? Escríbenos por WhatsApp →'),
        )
      : React.createElement('form', { className: 'form-fields', onSubmit: handleSubmit, name: 'cotizacion-hero', 'data-netlify': 'true' },
          React.createElement('input', { type: 'hidden', name: 'form-name', value: 'cotizacion-hero' }),
          React.createElement('div', { className: 'form-row' },
            React.createElement('input', { type: 'text', placeholder: 'Nombre*', value: nombre, onChange: (e) => setNombre(e.target.value), required: true }),
            React.createElement('input', { type: 'text', placeholder: 'Apellido*', value: apellido, onChange: (e) => setApellido(e.target.value), required: true }),
          ),
          React.createElement('input', { type: 'email', placeholder: 'Correo electrónico*', value: email, onChange: (e) => setEmail(e.target.value), required: true }),
          React.createElement(PhoneField, { value: tel, onChange: setTel, country, onCountryChange: setCountry, placeholder: 'Teléfono*', required: true }),
          React.createElement('input', { type: 'text', placeholder: 'Producto a importar', value: producto, onChange: (e) => setProducto(e.target.value) }),
          React.createElement('div', { className: 'form-row' },
            React.createElement('input', { type: 'text', placeholder: 'Origen (ej. Shanghái)', value: origen, onChange: (e) => setOrigen(e.target.value) }),
            React.createElement('input', { type: 'text', placeholder: 'Aduana destino', value: aduanaDestino, onChange: (e) => setAduanaDestino(e.target.value) }),
          ),
          React.createElement('select', {
            value: valorMercancia, onChange: (e) => setValorMercancia(e.target.value), required: true,
          },
            React.createElement('option', { value: '' }, 'Valor aproximado de la mercancía'),
            VALOR_OPTIONS.map((v) => React.createElement('option', { key: v, value: v }, v)),
          ),
          React.createElement('textarea', { placeholder: 'Cuéntanos más sobre tu carga o proyecto', value: mensaje, onChange: (e) => setMensaje(e.target.value) }),
          status === 'error' && React.createElement('p', { role: 'alert', style: { color: '#B3261E', fontSize: 13, margin: 0 } },
            error, ' ',
            React.createElement('a', { href: whatsappLink(whatsappMessage()), target: '_blank', rel: 'noopener noreferrer', style: { textDecoration: 'underline' } }, 'Abrir WhatsApp'),
          ),
          React.createElement('button', { type: 'submit', className: 'form-submit', disabled: status === 'sending' },
            status === 'sending' ? 'Enviando…' : 'Solicitar información'),
        ),
  );
}

