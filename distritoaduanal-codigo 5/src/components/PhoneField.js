import React, { useState, useRef, useEffect } from 'react';
import { COUNTRIES, flagEmoji } from '../data/countries.js';

// Campo de teléfono con selector de código de país (bandera + código de
// marcación). `value`/`onChange` controlan solo el número; el país
// seleccionado se expone hacia afuera vía `onCountryChange`.
export default function PhoneField({ value, onChange, country, onCountryChange, placeholder = 'Tu número', required = false }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const filtered = COUNTRIES.filter(([iso, dial, name]) =>
    name.toLowerCase().includes(search.toLowerCase()) || dial.includes(search)
  );

  return React.createElement('div', { className: 'phone-field', ref: wrapRef },
    React.createElement('button', {
      type: 'button',
      className: 'phone-select-trigger',
      onClick: () => setOpen((v) => !v),
    },
      React.createElement('span', { className: 'flag' }, flagEmoji(country[0])),
      React.createElement('span', null, country[1]),
    ),
    open && React.createElement('div', { className: 'phone-dropdown' },
      React.createElement('input', {
        type: 'text',
        className: 'phone-search',
        placeholder: 'Buscar país o código…',
        value: search,
        onChange: (e) => setSearch(e.target.value),
        autoFocus: true,
      }),
      React.createElement('ul', { className: 'phone-list' },
        filtered.map(([iso, dial, name]) => React.createElement('li', { key: iso },
          React.createElement('button', {
            type: 'button',
            className: 'phone-option',
            onClick: () => { onCountryChange([iso, dial, name]); setOpen(false); setSearch(''); },
          },
            React.createElement('span', { className: 'flag' }, flagEmoji(iso)),
            React.createElement('span', null, name),
            React.createElement('span', { className: 'dial' }, dial),
          ),
        )),
      ),
    ),
    React.createElement('input', {
      type: 'tel',
      placeholder,
      required,
      value,
      onChange: (e) => onChange(e.target.value),
    }),
  );
}
