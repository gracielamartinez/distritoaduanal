import React, { useState } from 'react';
import { whatsappLink } from '../config.js';

// Formulario funcional sin backend: arma un mensaje de WhatsApp con los datos
// capturados y abre el chat. Si más adelante hay un backend o un proveedor de
// formularios (Formspree, etc.), este es el único lugar que hay que tocar.
export default function QuoteForm({ withMessageField = true, submitLabel = 'Enviar', onSuccess }) {
  const [values, setValues] = useState({ nombre: '', whatsapp: '', mensaje: '' });
  const [sent, setSent] = useState(false);

  const update = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.nombre.trim() || !values.whatsapp.trim()) return;
    const lines = [
      `Hola, soy ${values.nombre}.`,
      values.mensaje.trim() ? values.mensaje.trim() : 'Quiero información sobre una importación.',
      `Mi WhatsApp: ${values.whatsapp}`,
    ];
    window.open(whatsappLink(lines.join('\n')), '_blank', 'noopener,noreferrer');
    setSent(true);
    if (onSuccess) onSuccess();
  };

  if (sent) {
    return React.createElement('div', { className: 'form-fields' },
      React.createElement('p', { style: { color: '#1F6B32', fontWeight: 600 } }, '¡Gracias! Se abrió WhatsApp con tu mensaje listo para enviar.'),
    );
  }

  return React.createElement('form', { className: 'form-fields', onSubmit: handleSubmit },
    React.createElement('input', {
      type: 'text', placeholder: 'Nombre', value: values.nombre, onChange: update('nombre'), required: true,
    }),
    React.createElement('input', {
      type: 'tel', placeholder: 'WhatsApp', value: values.whatsapp, onChange: update('whatsapp'), required: true,
    }),
    withMessageField && React.createElement('textarea', {
      placeholder: '¿Qué quieres importar?', value: values.mensaje, onChange: update('mensaje'),
    }),
    React.createElement('button', { type: 'submit', className: 'form-submit' }, submitLabel),
  );
}
