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

// ---- Proteger el nombre de la marca ("Distrito Aduanal") ----
// Google traduciría "Distrito Aduanal" como "Customs District". Lo envolvemos en
// un <span translate="no">, que Google respeta y deja intacto.
const MARCA = /(Distrito Aduanal)/gi;
const SALTAR = 'script, style, noscript, .notranslate, [translate="no"]';

function envolverMarca(raiz) {
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
      if (/Distrito Aduanal/i.test(n.nodeValue) && !(n.parentElement && n.parentElement.closest(SALTAR))) nodos.push(n);
    }
  }
  nodos.forEach((nodo) => {
    if (!nodo.parentNode || !/Distrito Aduanal/i.test(nodo.nodeValue)) return;
    const frag = document.createDocumentFragment();
    nodo.nodeValue.split(MARCA).forEach((trozo) => {
      if (!trozo) return;
      if (/^Distrito Aduanal$/i.test(trozo)) {
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

function protegerMarca() {
  const root = document.getElementById('root') || document.body;
  envolverMarca(root);
  // Lo que React agregue después (acordeones, etc.) también se protege, antes de
  // que Google alcance a traducirlo.
  new MutationObserver((mutaciones) => {
    mutaciones.forEach((m) => m.addedNodes.forEach((n) => {
      if (n.nodeType === 1 || n.nodeType === 3) envolverMarca(n);
    }));
  }).observe(root, { childList: true, subtree: true });
}

// El <title> no admite etiquetas: si Google lo traduce, devolvemos el nombre
// de la marca en la misma posición que tenía en el título original.
function protegerTitulo() {
  const inicial = document.title || '';
  const original = inicial.split(' | ');
  const indices = original.map((t, i) => (/Distrito Aduanal/i.test(t) ? i : -1)).filter((i) => i >= 0);
  if (!indices.length) return;

  const corregir = () => {
    const titulo = document.querySelector('title');
    if (!titulo) return;
    const actual = titulo.textContent;
    const partes = actual.split(' | ');
    // Mismo número de partes: devolvemos el nombre a su posición original.
    // Si Google cambió la estructura, reemplazamos las traducciones conocidas.
    const nuevo = partes.length === original.length
      ? partes.map((t, i) => (indices.includes(i) ? 'Distrito Aduanal' : t)).join(' | ')
      : actual.replace(/Customs District|District Customs|Customs Office|Customs Agency/gi, 'Distrito Aduanal');
    if (nuevo !== actual) titulo.textContent = nuevo;
  };
  // Se observa todo el <head>: funciona aunque Google reemplace el elemento <title>.
  new MutationObserver(corregir).observe(document.head, { childList: true, characterData: true, subtree: true });
  corregir();
}

// Llamar una vez, DESPUÉS de pintar la app: Google traduce lo que ya está en
// pantalla, y luego sigue traduciendo lo que React vaya agregando.
export function initTranslate() {
  if (!isTranslated()) return;
  document.documentElement.classList.add('is-translated');
  protegerMarca();
  protegerTitulo();

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
