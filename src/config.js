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
