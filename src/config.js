// Datos de contacto y de la empresa.
// Estos son los valores por defecto (se usan si el CMS todavía no tiene
// contenido, o si la carga de content/site.json falla). Una vez editado desde
// /admin, el contenido real vive en content/site.json — no aquí.
export const SITE = {
  name: 'Distrito Aduanal',
  tagline: 'Siempre juntos, de origen a destino.',
  phoneDisplay: '+52 999 604 7334',
  phoneHref: 'tel:+529996047334',
  whatsappNumber: '5219996047334', // formato internacional para wa.me (México requiere el "1" extra)
  email: 'soluciones@distritoaduanal.com',
  facebookUrl: 'https://www.facebook.com/share/1MLqFhxfGd/?mibextid=wwXIfr',
  instagramUrl: 'https://www.instagram.com/distritoaduanal?stkn=MmN0dGd5cnNmZHFs',
  stats: {
    clients: '',
    operations: '',
    customsOffices: '',
    sectors: '',
  },
  review: {
    count: '',
    quote: '',
    author: '',
  },
};

// Correos que reciben las respuestas del formulario de cotización del inicio.
// El envío lo hace FormSubmit (formsubmit.co): el primer correo de la lista es
// el destinatario principal y los demás van en copia. La primera vez que se
// envíe el formulario, FormSubmit manda un correo de activación al destinatario
// principal; hay que abrirlo y confirmar para que empiecen a llegar.
export const FORM_RECIPIENTS = ['gmartinez@distritoaduanal.com', 'soluciones@distritoaduanal.com'];

export async function sendFormByEmail(subject, fields) {
  const [to, ...cc] = FORM_RECIPIENTS;
  const res = await fetch(`https://formsubmit.co/ajax/${to}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      ...fields,
      _subject: subject,
      _cc: cc.join(','),
      _replyto: fields['Correo'] || '',
      _template: 'table',
      _captcha: 'false',
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || String(data.success) !== 'true') {
    throw new Error(data.message || `Error ${res.status}`);
  }
}

export const whatsappLink = (message) =>
  `https://wa.me/${SITE.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

// Reemplaza el contenido de SITE con lo que venga de content/site.json,
// conservando los valores por defecto para cualquier campo que falte.
export async function hydrateSite() {
  try {
    const res = await fetch('./content/site.json', { cache: 'no-store' });
    if (!res.ok) return;
    const data = await res.json();
    Object.assign(SITE, data, {
      stats: { ...SITE.stats, ...(data.stats || {}) },
      review: { ...SITE.review, ...(data.review || {}) },
    });
  } catch (e) {
    // Sin conexión o sin content/site.json todavía: se mantienen los valores por defecto.
  }
}
