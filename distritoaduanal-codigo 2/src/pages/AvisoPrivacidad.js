import React from 'react';
import { SITE } from '../config.js';

// Borrador basado en la Ley Federal de Protección de Datos Personales en
// Posesión de los Particulares (LFPDPPP). Conviene que lo revise un abogado
// y que se complete la razón social y el domicilio (editables en /admin →
// Datos generales).
const PENDIENTE = (texto) => React.createElement('span', { className: 'fill-me' }, texto);

const Seccion = (titulo, ...contenido) => [
  React.createElement('h2', { key: 'h' }, titulo),
  ...contenido,
];

export default function AvisoPrivacidad() {
  const responsable = SITE.legalName || SITE.name;
  const correo = SITE.email;

  return React.createElement('section', { className: 'section', style: { paddingTop: 92, paddingBottom: 92 } },
    React.createElement('div', { className: 'wrap' },
      React.createElement('div', { className: 'legal' },
        React.createElement('div', { className: 'eyebrow' }, 'Legal'),
        React.createElement('h1', { className: 'page-title' }, 'Aviso de privacidad'),
        React.createElement('p', { className: 'legal-date' }, 'Última actualización: octubre de 2026'),

        ...Seccion('¿Quién es responsable de tus datos personales?',
          React.createElement('p', null,
            `${responsable}, con domicilio en `,
            SITE.address || PENDIENTE('domicilio por completar'),
            ', es responsable del uso y la protección de tus datos personales, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.',
            !SITE.legalName ? React.createElement(React.Fragment, null, ' ', PENDIENTE('razón social por completar')) : null,
          ),
          React.createElement('p', null, `Para cualquier asunto relacionado con este aviso puedes escribirnos a ${correo}.`),
        ),

        ...Seccion('¿Qué datos personales recabamos?',
          React.createElement('ul', null,
            React.createElement('li', null, 'Datos de identificación y contacto: nombre, correo electrónico, teléfono o WhatsApp.'),
            React.createElement('li', null, 'Datos de tu operación: el producto que quieres importar o exportar, países o aduanas de origen y destino, valor aproximado y la información que decidas compartir en tu mensaje.'),
            React.createElement('li', null, 'Si contratas nuestros servicios: datos fiscales (como RFC, razón social y domicilio fiscal) y los documentos de la operación (facturas, listas de empaque, documentos de transporte) que sean necesarios para el despacho.'),
          ),
          React.createElement('p', null, 'No solicitamos datos personales sensibles.'),
        ),

        ...Seccion('¿Para qué usamos tus datos?',
          React.createElement('p', null, 'Finalidades necesarias para darte el servicio:'),
          React.createElement('ul', null,
            React.createElement('li', null, 'Contactarte y responder tus preguntas o solicitudes de información.'),
            React.createElement('li', null, 'Elaborar cotizaciones y dar seguimiento a tu operación.'),
            React.createElement('li', null, 'Prestar los servicios de despacho aduanal, logística y asesoría que contrates.'),
            React.createElement('li', null, 'Facturación, cobranza y cumplimiento de obligaciones legales ante las autoridades.'),
          ),
          React.createElement('p', null, 'Finalidades adicionales:'),
          React.createElement('ul', null,
            React.createElement('li', null, 'Enviarte información, guías y novedades de comercio exterior.'),
            React.createElement('li', null, 'Mejorar nuestro servicio y la experiencia en este sitio.'),
          ),
          React.createElement('p', null, `Si no quieres que usemos tus datos para las finalidades adicionales, escríbenos a ${correo} y dejaremos de hacerlo. Esto no afecta el servicio que solicitaste.`),
        ),

        ...Seccion('¿Con quién compartimos tus datos?',
          React.createElement('p', null, 'Solo los compartimos cuando es necesario para prestar el servicio:'),
          React.createElement('ul', null,
            React.createElement('li', null, 'Agentes aduanales, navieras, aerolíneas, transportistas y aseguradoras que intervienen en tu operación.'),
            React.createElement('li', null, 'Autoridades competentes (por ejemplo, SAT o aduanas) cuando la ley lo exija.'),
            React.createElement('li', null, 'Proveedores tecnológicos que nos ayudan a recibir tus mensajes: usamos el servicio FormSubmit para enviarnos por correo los formularios de este sitio, y WhatsApp si nos escribes por ese medio.'),
          ),
          React.createElement('p', null, 'No vendemos tus datos personales.'),
        ),

        ...Seccion('Tus derechos (ARCO) y cómo ejercerlos',
          React.createElement('p', null, 'Tienes derecho a acceder a tus datos, rectificarlos si son inexactos, cancelarlos u oponerte a su uso. También puedes revocar tu consentimiento o limitar el uso de tus datos.'),
          React.createElement('p', null, `Para ejercer cualquiera de estos derechos, envía un correo a ${correo} con tu nombre, un medio para responderte, una descripción clara de lo que solicitas y un documento que acredite tu identidad. Te responderemos en los plazos que marca la ley.`),
        ),

        ...Seccion('Cookies y tecnologías',
          React.createElement('p', null, 'Este sitio no utiliza cookies de rastreo publicitario. Para mostrarse, puede cargar recursos de terceros (por ejemplo, tipografías), que pueden recibir tu dirección IP al abrir la página.'),
        ),

        ...Seccion('Cambios a este aviso',
          React.createElement('p', null, 'Si modificamos este aviso, publicaremos la versión actualizada en esta misma página. Si consideras que tu derecho a la protección de datos ha sido vulnerado, puedes acudir ante la autoridad competente en la materia.'),
        ),
      ),
    ),
  );
}
