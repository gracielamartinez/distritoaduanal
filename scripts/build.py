"""Genera la carpeta dist/ que publica Netlify (ver netlify.toml).

Copia el sitio tal cual y además crea, por cada página, su propio index.html
(p. ej. dist/blog/incoterms-explicados/index.html) con el título, la
descripción, la URL canónica, la vista previa para redes y los datos
estructurados de esa página. También genera sitemap.xml, robots.txt y 404.html.

Así Google (y WhatsApp/Facebook al compartir un enlace) ven cada página por
separado, aunque el contenido lo siga pintando React en el navegador.

Solo usa la biblioteca estándar de Python. Netlify lo corre en cada publicación,
incluidas las que hace el panel /admin, así que un artículo nuevo del blog
aparece solo en el sitemap. Para probarlo en tu computadora:
    python3 scripts/build.py && python3 -m http.server 8080 -d dist
"""
import html
import json
import os
import re
import shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(ROOT, 'dist')

# Netlify define URL con el dominio principal del sitio; cuando se conecte
# distritoaduanal.com y se marque como principal, todo se actualiza solo.
SITE_URL = (os.environ.get('URL') or 'https://distritoaduanal.netlify.app').rstrip('/')

SKIP = {'.git', '.claude', '.gitignore', 'dist', 'scripts', 'netlify.toml', 'README.md', '.DS_Store'}
SUFFIX = ' | Distrito Aduanal'
DEFAULT_IMAGE = '/assets/photos/banner-containers.jpg'


def read_json(rel):
    with open(os.path.join(ROOT, rel), encoding='utf-8') as f:
        return json.load(f)


def href(path):
    return '/' if path == '/' else path.rstrip('/') + '/'


def absolute(path):
    return SITE_URL + path


def share_image(path):
    # En la página se usan fotos .webp (más ligeras); para la vista previa al
    # compartir se usa la versión .jpg, que WhatsApp sí muestra siempre.
    return re.sub(r'\.webp$', '.jpg', path)


def post_images():
    """Lee src/data/blogImages.js (slug -> foto de portada)."""
    with open(os.path.join(ROOT, 'src/data/blogImages.js'), encoding='utf-8') as f:
        return dict(re.findall(r"'([\w-]+)':\s*'([^']+)'", f.read()))


def breadcrumbs(items):
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {'@type': 'ListItem', 'position': i + 1, 'name': name, 'item': absolute(href(path))}
            for i, (name, path) in enumerate(items)
        ],
    }


def organization(site):
    same_as = [u for u in (site.get('facebookUrl'), site.get('instagramUrl')) if u]
    return {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        'name': site.get('name', 'Distrito Aduanal'),
        'description': 'Comercializadora aduanal y logística de comercio exterior: despacho de importación '
                       'y exportación, clasificación arancelaria y asesoría para importar y exportar en México.',
        'url': SITE_URL + '/',
        'logo': absolute('/assets/logo-dark.png'),
        'image': absolute(DEFAULT_IMAGE),
        'telephone': site.get('phoneDisplay'),
        'email': site.get('email'),
        'areaServed': {'@type': 'Country', 'name': 'México'},
        'sameAs': same_as,
    }


def faq_page(faq):
    questions = [item for cat in faq.get('categories', []) for item in cat.get('items', [])]
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
            {'@type': 'Question', 'name': q['q'], 'acceptedAnswer': {'@type': 'Answer', 'text': q['a']}}
            for q in questions if q.get('q') and q.get('a')
        ],
    }


def blog_posting(post, image, site):
    publisher = {
        '@type': 'Organization',
        'name': site.get('name', 'Distrito Aduanal'),
        'logo': {'@type': 'ImageObject', 'url': absolute('/assets/logo-dark.png')},
    }
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': post['title'],
        'description': post['excerpt'],
        'image': absolute(image),
        'inLanguage': 'es-MX',
        'mainEntityOfPage': absolute(href('/blog/' + post['slug'])),
        'author': {'@type': 'Organization', 'name': site.get('name', 'Distrito Aduanal'), 'url': SITE_URL + '/'},
        'publisher': publisher,
    }


def build_pages():
    site = read_json('content/site.json')
    pages = read_json('content/pages.json')['pages']
    posts = read_json('content/blog.json')['posts']
    faq = read_json('content/faq.json')
    images = post_images()
    names = {'/servicios': 'Servicios', '/preguntas-frecuentes': 'Preguntas frecuentes',
             '/foro': 'Foro', '/blog': 'Blog', '/nosotros': 'Nosotros'}

    out = []
    for path, meta in pages.items():
        ld = [organization(site)] if path == '/' else [breadcrumbs([('Inicio', '/'), (names.get(path, meta['title']), path)])]
        if path == '/preguntas-frecuentes':
            ld.append(faq_page(faq))
        out.append({'path': path, 'title': meta['title'], 'description': meta['description'],
                    'image': DEFAULT_IMAGE, 'type': 'website', 'ld': ld})
    for post in posts:
        path = '/blog/' + post['slug']
        image = share_image(images.get(post['slug'], DEFAULT_IMAGE))
        out.append({'path': path, 'title': post['title'] + SUFFIX, 'description': post['excerpt'],
                    'image': image, 'type': 'article',
                    'ld': [blog_posting(post, image, site),
                           breadcrumbs([('Inicio', '/'), ('Blog', '/blog'), (post['title'], path)])]})
    return out


def seo_block(page, noindex=False):
    e = lambda s: html.escape(s, quote=True)
    url = absolute(href(page['path']))
    lines = [
        '<title>%s</title>' % e(page['title']),
        '<meta name="description" content="%s" />' % e(page['description']),
    ]
    if noindex:
        lines.append('<meta name="robots" content="noindex" />')
    else:
        lines.append('<link rel="canonical" href="%s" />' % e(url))
    lines += [
        '<meta property="og:type" content="%s" />' % page['type'],
        '<meta property="og:title" content="%s" />' % e(page['title']),
        '<meta property="og:description" content="%s" />' % e(page['description']),
        '<meta property="og:url" content="%s" />' % e(url),
        '<meta property="og:image" content="%s" />' % e(absolute(page['image'])),
        '<meta name="twitter:card" content="summary_large_image" />',
    ]
    for data in page.get('ld', []):
        # "</" dentro del JSON cerraría la etiqueta <script> antes de tiempo.
        payload = json.dumps(data, ensure_ascii=False).replace('</', '<\\/')
        lines.append('<script type="application/ld+json">%s</script>' % payload)
    return '\n'.join('  ' + l for l in lines) + '\n'


def module_preloads():
    """Pide todos los módulos de src/ desde el HTML, en paralelo, en vez de
    descubrirlos uno por uno conforme se van importando."""
    files = []
    for dirpath, _, filenames in os.walk(os.path.join(ROOT, 'src')):
        for name in filenames:
            if name.endswith('.js'):
                rel = os.path.relpath(os.path.join(dirpath, name), ROOT).replace(os.sep, '/')
                files.append(rel)
    return ''.join('  <link rel="modulepreload" href="/%s" />\n' % f for f in sorted(files))


def render(template, page, noindex=False):
    start = template.index('  <!-- SEO:START')
    end = template.index('<!-- SEO:END -->') + len('<!-- SEO:END -->\n')
    doc = template[:start] + seo_block(page, noindex) + template[end:]
    if noindex:
        doc = doc.replace('  <meta name="robots" content="index, follow" />\n', '')
    start = doc.index('  <!-- MODULEPRELOAD')
    end = doc.index('-->', start) + len('-->\n')
    return doc[:start] + module_preloads() + doc[end:]


def write(rel, text):
    path = os.path.join(DIST, rel)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(text)


def main():
    if os.path.exists(DIST):
        shutil.rmtree(DIST)
    shutil.copytree(ROOT, DIST, ignore=lambda d, names: [n for n in names if d == ROOT and n in SKIP or n == '.DS_Store'])

    with open(os.path.join(ROOT, 'index.html'), encoding='utf-8') as f:
        template = f.read()

    pages = build_pages()
    for page in pages:
        rel = 'index.html' if page['path'] == '/' else page['path'].strip('/') + '/index.html'
        write(rel, render(template, page))

    not_found = {'path': '/', 'title': 'Página no encontrada' + SUFFIX,
                 'description': 'La página que buscas no existe o cambió de dirección.',
                 'image': DEFAULT_IMAGE, 'type': 'website'}
    write('404.html', render(template, not_found, noindex=True))

    urls = ''.join('  <url><loc>%s</loc></url>\n' % html.escape(absolute(href(p['path']))) for p in pages)
    write('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n'
                         '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n%s</urlset>\n' % urls)
    write('robots.txt', 'User-agent: *\nDisallow: /admin/\n\nSitemap: %s/sitemap.xml\n' % SITE_URL)

    print('Sitio generado en dist/ para %s: %d páginas.' % (SITE_URL, len(pages)))


if __name__ == '__main__':
    main()
