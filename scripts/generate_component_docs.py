from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[1]
NAMES = ['accordion','alert-dialog','alert','aspect-ratio','attachment','avatar','badge','breadcrumb','bubble','button-group','button','calendar','card','carousel','chart','checkbox','collapsible','combobox','command','context-menu','dialog','direction','drawer','dropdown-menu','empty','field','form','hover-card','input-group','input-otp','input','item','kbd','label','marker','menubar','message-scroller','message','native-select','navigation-menu','pagination','popover','progress','radio-group','resizable','scroll-area','select','separator','sheet','sidebar','skeleton','slider','sonner','spinner','switch','table','tabs','textarea','toggle-group','toggle','tooltip']

def title(slug: str) -> str:
    return ' '.join(part.capitalize() for part in slug.split('-'))

def page_shell(body: str, *, page_title: str, description: str, canonical: str) -> str:
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#b9a1ed"><link rel="icon" href="/favicon.svg"><link rel="stylesheet" href="/base.css"><link rel="stylesheet" href="/sections.css"><link rel="stylesheet" href="/docs.css"><script>(()=>{{const t=localStorage.getItem('rivet-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}})()</script><meta name="description" content="{escape(description)}"><title>{escape(page_title)}</title><link rel="canonical" href="{canonical}"></head>{body}</html>'''

def main():
    template = (ROOT / 'component-template.html').read_text()
    component_root = ROOT / 'components'
    component_root.mkdir(exist_ok=True)

    for slug in NAMES:
        out = component_root / slug / 'index.html'
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(template.replace('{{SLUG}}', slug).replace('{{TITLE}}', title(slug)))

    header = '''<body class="docs-body"><div class="grid"></div><header class="docs-top"><div class="docs-top-left"><a class="brand" href="/"><span class="mark"><i></i><i></i><i></i></span><span>NeoBrutal <em>Rivet</em></span></a><a class="docs-back" href="/components/">Components</a></div><div class="docs-top-actions"><button class="icon" id="theme" aria-label="Toggle dark mode">◐</button><a class="btn gh" href="https://github.com/NeoBrutalRivet/NeoBrutal-Rivet">GitHub ↗</a></div></header><div id="docsRoot"></div><script src="/docs-app.js"></script></body>'''
    (component_root / 'index.html').write_text(page_shell(header, page_title='Components — NeoBrutal Rivet', description='Browse all 61 NeoBrutal Rivet component contracts and documentation pages.', canonical='https://neobrutalrivet.github.io/components/'))

    linker = '''(() => {\n  const wire = () => {\n    document.querySelectorAll('[data-demo="expand"][data-component]').forEach(button => {\n      const slug = button.dataset.component;\n      button.removeAttribute('data-demo');\n      button.textContent = 'Open docs ↗';\n      button.onclick = () => { location.href = `/components/${slug}/`; };\n    });\n    document.querySelectorAll('.component-card-foot a[href*="registry/manifest.json"]').forEach(link => {\n      const slug = link.closest('[data-name]')?.dataset.name;\n      if (!slug) return;\n      link.href = `/components/${slug}/`;\n      link.removeAttribute('target');\n      link.removeAttribute('rel');\n      link.textContent = 'Docs';\n    });\n  };\n  wire();\n  const grid = document.querySelector('#componentGrid');\n  if (grid) new MutationObserver(wire).observe(grid, {childList:true, subtree:true});\n})();\n'''
    (ROOT / 'docs-linker.js').write_text(linker)

    index = ROOT / 'index.html'
    text = index.read_text()
    if 'docs-linker.js' not in text:
        text = text.replace('<script src="app.js"></script>', '<script src="app.js"></script><script src="docs-linker.js"></script>')
        index.write_text(text)

    urls = ['https://neobrutalrivet.github.io/', 'https://neobrutalrivet.github.io/components/'] + [f'https://neobrutalrivet.github.io/components/{name}/' for name in NAMES]
    sitemap = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for i, url in enumerate(urls):
        priority = '1.0' if i == 0 else ('0.9' if i == 1 else '0.7')
        sitemap.append(f'  <url><loc>{url}</loc><changefreq>weekly</changefreq><priority>{priority}</priority></url>')
    sitemap.append('</urlset>')
    (ROOT / 'sitemap.xml').write_text('\n'.join(sitemap) + '\n')

if __name__ == '__main__':
    main()
