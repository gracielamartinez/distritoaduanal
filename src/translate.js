// Traducción de toda la página al inglés con Google Translate.
//
// El script de Google solo se carga cuando el visitante pulsa "English"; quien
// navega en español no descarga nada de Google. El estado se guarda en la cookie
// `googtrans` (la misma que lee Google), así que sobrevive entre páginas.
const COOKIE = 'googtrans';
const EN = '/es/en';
const GOOGLE_SRC = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';

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

// ---- Proteger lo que NO debe traducirse: el nombre de la marca y los correos ----
// Google traduciría "Distrito Aduanal" como "Customs District" y
// "soluciones@..." como "solutions@...". Lo envolvemos en un
// <span translate="no">, que Google respeta y deja intacto.
const PATRON = 'Distrito Aduanal|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}';
const DIVIDIR = new RegExp(`(${PATRON})`, 'gi');
const CONTIENE = new RegExp(PATRON, 'i');
const ES_PROTEGIDO = new RegExp(`^(?:${PATRON})$`, 'i');
const SALTAR = 'script, style, noscript, .notranslate, [translate="no"]';

function envolverProtegidos(raiz) {
  if (!raiz || !raiz.nodeType) return;
  const base = raiz.nodeType === 3 ? raiz.parentNode : raiz;
  if (!base || (base.closest && base.closest(SALTAR))) return;
  const nodos = [];
  if (raiz.nodeType === 3) {
    nodos.push(raiz);
  } else {
    const walker = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const n = walker.currentNode;
      if (CONTIENE.test(n.nodeValue) && !(n.parentElement && n.parentElement.closest(SALTAR))) nodos.push(n);
    }
  }
  nodos.forEach((nodo) => {
    if (!nodo.parentNode || !CONTIENE.test(nodo.nodeValue)) return;
    const frag = document.createDocumentFragment();
    nodo.nodeValue.split(DIVIDIR).forEach((trozo) => {
      if (!trozo) return;
      if (ES_PROTEGIDO.test(trozo)) {
        const span = document.createElement('span');
        span.className = 'notranslate';
        span.setAttribute('translate', 'no');
        span.textContent = trozo;
        frag.appendChild(span);
      } else {
        frag.appendChild(document.createTextNode(trozo));
      }
    });
    nodo.parentNode.replaceChild(frag, nodo);
  });
}

function protegerTextos() {
  const root = document.getElementById('root') || document.body;
  envolverProtegidos(root);
  // Lo que React agregue después (acordeones, etc.) también se protege, antes de
  // que Google alcance a traducirlo.
  new MutationObserver((mutaciones) => {
    mutaciones.forEach((m) => m.addedNodes.forEach((n) => {
      if (n.nodeType === 1 || n.nodeType === 3) envolverProtegidos(n);
    }));
  }).observe(root, { childList: true, subtree: true });
}

// La pestaña del navegador NO se traduce: si Google cambia el <title>, lo
// devolvemos de inmediato al texto original en español.
function protegerTitulo() {
  const original = document.title;
  const restaurar = () => {
    const titulo = document.querySelector('title');
    if (titulo && titulo.textContent !== original) titulo.textContent = original;
  };
  // Se observa todo el <head>: funciona aunque Google reemplace el elemento <title>.
  new MutationObserver(restaurar).observe(document.head, { childList: true, characterData: true, subtree: true });
}

// ---- Arranque de Google Translate ----
// Para que sea rápido, el script de Google se descarga en paralelo mientras la
// página carga; el widget se crea solo cuando ya están listos el script Y la
// página pintada (así Google traduce lo que ya está en pantalla).
let scriptSolicitado = false;
let googleListo = false;
let paginaLista = false;
let widgetCreado = false;

function arrancar() {
  if (!googleListo || !paginaLista || widgetCreado) return;
  widgetCreado = true;
  const holder = document.createElement('div');
  holder.id = 'google_translate_element';
  document.body.appendChild(holder);
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
    } else if (intentos > 100) {
      clearInterval(timer);
    }
  }, 50);
}

function cargarGoogle() {
  if (scriptSolicitado) return;
  scriptSolicitado = true;
  window.googleTranslateElementInit = () => { googleListo = true; arrancar(); };
  const script = document.createElement('script');
  script.src = GOOGLE_SRC;
  script.async = true;
  document.body.appendChild(script);
}

function paginaPintada() {
  if (paginaLista) return;
  paginaLista = true;
  protegerTextos();
  protegerTitulo();
  arrancar();
}

// 1) Llamar al iniciar la app, antes de pintar: empieza a descargar el script.
export function prepararTraduccion() {
  if (!isTranslated()) return;
  document.documentElement.classList.add('is-translated');
  cargarGoogle();
}

// 2) Llamar justo después de pintar la app.
export function initTranslate() {
  if (isTranslated()) paginaPintada();
}

// Al pasar el cursor sobre el botón, adelantamos la descarga del script.
let precargado = false;
export function precargarGoogle() {
  if (precargado || scriptSolicitado) return;
  precargado = true;
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'script';
  link.href = GOOGLE_SRC;
  document.head.appendChild(link);
}

// Traduce en el momento, sin recargar la página.
function activarTraduccion() {
  setCookie();
  document.documentElement.classList.add('is-translated');
  cargarGoogle();
  paginaPintada();
}

export function toggleLanguage() {
  if (isTranslated()) {
    clearCookie();
    window.location.reload();
  } else {
    activarTraduccion();
  }
}
