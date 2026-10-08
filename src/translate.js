// Traducción de toda la página al inglés con Google Translate.
//
// El script de Google solo se carga cuando el visitante pulsa "English"; quien
// navega en español no descarga nada de Google. El estado se guarda en la cookie
// `googtrans` (la misma que lee Google), así que sobrevive entre páginas.
const COOKIE = 'googtrans';
const EN = '/es/en';

export function isTranslated() {
  return new RegExp(`(?:^|;\\s*)${COOKIE}=${EN}(?:;|$)`).test(document.cookie);
}

function domainVariants() {
  const parts = window.location.hostname.split('.');
  const out = [];
  for (let i = 0; i <= parts.length - 2; i += 1) out.push(parts.slice(i).join('.'));
  return out;
}

function setCookie() {
  document.cookie = `${COOKIE}=${EN}; path=/`;
  domainVariants().forEach((d) => { document.cookie = `${COOKIE}=${EN}; path=/; domain=${d}`; });
}

function clearCookie() {
  const gone = 'expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  document.cookie = `${COOKIE}=; ${gone}`;
  domainVariants().forEach((d) => {
    document.cookie = `${COOKIE}=; ${gone}; domain=${d}`;
    document.cookie = `${COOKIE}=; ${gone}; domain=.${d}`;
  });
}

export function toggleLanguage() {
  if (isTranslated()) clearCookie(); else setCookie();
  window.location.reload();
}

// Llamar una vez, DESPUÉS de pintar la app: Google traduce lo que ya está en
// pantalla, y luego sigue traduciendo lo que React vaya agregando.
export function initTranslate() {
  if (!isTranslated()) return;
  document.documentElement.classList.add('is-translated');

  const holder = document.createElement('div');
  holder.id = 'google_translate_element';
  document.body.appendChild(holder);

  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      { pageLanguage: 'es', includedLanguages: 'en', autoDisplay: false },
      'google_translate_element',
    );
    // Pedimos el inglés explícitamente (no depender solo de la cookie).
    let intentos = 0;
    const timer = setInterval(() => {
      const combo = document.querySelector('.goog-te-combo');
      intentos += 1;
      if (combo) {
        clearInterval(timer);
        combo.value = 'en';
        combo.dispatchEvent(new Event('change'));
      } else if (intentos > 40) {
        clearInterval(timer);
      }
    }, 150);
  };
  const script = document.createElement('script');
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.body.appendChild(script);
}
