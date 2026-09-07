from pathlib import Path
from xml.sax.saxutils import escape
import json

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://neobrutalrivet.github.io'
SOURCE = 'https://github.com/NeoBrutalRivet/NeoBrutal-Rivet'
NAMES = ['accordion','alert-dialog','alert','aspect-ratio','attachment','avatar','badge','breadcrumb','bubble','button-group','button','calendar','card','carousel','chart','checkbox','collapsible','combobox','command','context-menu','dialog','direction','drawer','dropdown-menu','empty','field','form','hover-card','input-group','input-otp','input','item','kbd','label','marker','menubar','message-scroller','message','native-select','navigation-menu','pagination','popover','progress','radio-group','resizable','scroll-area','select','separator','sheet','sidebar','skeleton','slider','sonner','spinner','switch','table','tabs','textarea','toggle-group','toggle','tooltip']


def title(slug: str) -> str:
    return ' '.join(part.capitalize() for part in slug.split('-'))


def component_description(slug: str) -> str:
    return f'Live {title(slug)} component preview, contract, accessibility guidance and LLM instructions for NeoBrutal Rivet, a neo-brutalist React UI design system.'


def static_component(slug: str) -> str:
    name = title(slug)
    source = f'{SOURCE}/blob/main/components/ui/{slug}.tsx'
    return f'''<main class="docs-shell"><div class="docs-breadcrumb"><a href="/components/">Components</a><span>›</span><b>{escape(name)}</b></div><section class="docs-hero"><div><h1>{escape(name)} component</h1><p>{escape(name)} is part of NeoBrutal Rivet, a neo-brutalist React UI design system with semantic tokens, hard borders, crisp shadows, light and dark themes, accessibility guidance, and agent-readable contracts.</p></div><div class="docs-badges"><span class="demo-pill lime">Public alpha</span><span class="demo-pill lavender">Neo-brutalism UI</span></div></section><section class="docs-card"><div class="docs-copy"><h2>Neo-brutalist {escape(name)} UI</h2><p>Explore the live preview, usage guidance, registered component contract, accessibility checklist, and instructions for coding agents. The existing React source remains the implementation source of truth during the public alpha.</p><p><a href="{source}">View {escape(name)} React source ↗</a> · <a href="{SOURCE}/blob/main/registry/manifest.json">Open component registry ↗</a></p></div></section></main>'''


def component_json_ld(slug: str) -> str:
    name = title(slug)
    url = f'{BASE}/components/{slug}/'
    data = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'TechArticle',
                '@id': f'{url}#article',
                'headline': f'{name} Component — NeoBrutal Rivet',
                'description': component_description(slug),
                'url': url,
                'isPartOf': {'@id': f'{BASE}/#website'},
                'about': ['neo-brutalism UI', 'neobrutalism', 'React design system', f'{name} component'],
                'mainEntityOfPage': {'@id': url},
            },
            {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                    {'@type': 'ListItem', 'position': 1, 'name': 'NeoBrutal Rivet', 'item': f'{BASE}/'},
                    {'@type': 'ListItem', 'position': 2, 'name': 'Components', 'item': f'{BASE}/components/'},
                    {'@type': 'ListItem', 'position': 3, 'name': name, 'item': url},
                ],
            },
        ],
    }
    return json.dumps(data, separators=(',', ':')).replace('</', '<\\/')


def page_shell(body: str, *, page_title: str, description: str, canonical: str, json_ld: dict) -> str:
    structured = json.dumps(json_ld, separators=(',', ':')).replace('</', '<\\/')
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#b9a1ed"><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"><meta name="description" content="{escape(description)}"><meta property="og:type" content="website"><meta property="og:site_name" content="NeoBrutal Rivet"><meta property="og:title" content="{escape(page_title)}"><meta property="og:description" content="{escape(description)}"><meta property="og:url" content="{canonical}"><meta name="twitter:card" content="summary"><meta name="twitter:title" content="{escape(page_title)}"><meta name="twitter:description" content="{escape(description)}"><title>{escape(page_title)}</title><link rel="canonical" href="{canonical}"><link rel="icon" href="/favicon.svg"><link rel="describedby" href="/llms.txt" type="text/markdown"><link rel="alternate" href="/llms-full.txt" type="text/markdown" title="NeoBrutal Rivet LLM documentation index"><link rel="alternate" href="https://raw.githubusercontent.com/NeoBrutalRivet/NeoBrutal-Rivet/main/registry/manifest.json" type="application/json" title="NeoBrutal Rivet component registry"><link rel="stylesheet" href="/base.css"><link rel="stylesheet" href="/sections.css"><link rel="stylesheet" href="/docs.css"><script type="application/ld+json">{structured}</script><script>(()=>{{const t=localStorage.getItem('rivet-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}})()</script></head>{body}</html>'''


def write_llm_indexes():
    curated = [
        '# NeoBrutal Rivet',
        '',
        '> NeoBrutal Rivet is a public-alpha neo-brutalist React UI design system for humans and coding agents. It provides 61 component contracts, live previews, semantic CSS tokens, light/dark/system themes, accessibility guidance, and an agent-readable registry.',
        '',
        '## Start here',
        f'- [Homepage]({BASE}/): Overview of the neobrutalism UI design system, visual language, themes, components, and LLM workflow.',
        f'- [Component docs]({BASE}/components/): Search and browse all 61 documented UI component contracts.',
        f'- [GitHub source]({SOURCE}): Canonical source repository.',
        f'- [Registry]({SOURCE}/blob/main/registry/manifest.json): Machine-readable component inventory and data-slot contracts.',
        f'- [LLM guide]({SOURCE}/blob/main/docs/LLM-GUIDE.md): Discover-before-invent workflow for coding agents.',
        f'- [AGENTS.md]({SOURCE}/blob/main/AGENTS.md): Project rules for agents working with Rivet.',
        '',
        '## Representative component docs',
        f'- [Button]({BASE}/components/button/): Buttons and action styling.',
        f'- [Input]({BASE}/components/input/): Text input contract and guidance.',
        f'- [Dialog]({BASE}/components/dialog/): Modal dialog contract and accessibility guidance.',
        f'- [Sidebar]({BASE}/components/sidebar/): Application navigation sidebar contract.',
        f'- [Combobox]({BASE}/components/combobox/): Searchable selection component contract.',
        f'- [Table]({BASE}/components/table/): Tabular content contract.',
        '',
        '## Project vocabulary',
        '- Primary topics: neo-brutalism UI, neobrutalism design system, React UI components, design tokens, dark mode, accessible component patterns, LLM-readable UI registry.',
        '- Product name: NeoBrutal Rivet.',
        '- Identifier: neobrutal-rivet.',
        '- Status: public alpha.',
        '- Tagline: Designed for humans. Structured for machines.',
    ]
    (ROOT / 'llms.txt').write_text('\n'.join(curated) + '\n')

    full = curated + ['', '## All component documentation']
    full += [f'- [{title(name)}]({BASE}/components/{name}/): NeoBrutal Rivet {title(name)} component preview, contract, accessibility, and LLM guidance.' for name in NAMES]
    full += [
        '',
        '## Technical references',
        f'- [Foundations]({SOURCE}/blob/main/docs/FOUNDATIONS.md): Tokens, themes, fluid sizing, motion, and visual rules.',
        f'- [Registry JSON](https://raw.githubusercontent.com/NeoBrutalRivet/NeoBrutal-Rivet/main/registry/manifest.json): Raw machine-readable registry.',
        f'- [Component source directory]({SOURCE}/tree/main/components/ui): React/TypeScript component sources.',
    ]
    (ROOT / 'llms-full.txt').write_text('\n'.join(full) + '\n')


def main():
    template = (ROOT / 'component-template.html').read_text()
    component_root = ROOT / 'components'
    component_root.mkdir(exist_ok=True)

    for slug in NAMES:
        out = component_root / slug / 'index.html'
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(
            template
            .replace('{{SLUG}}', slug)
            .replace('{{TITLE}}', title(slug))
            .replace('{{META_DESCRIPTION}}', component_description(slug))
            .replace('{{JSON_LD}}', component_json_ld(slug))
            .replace('{{STATIC_CONTENT}}', static_component(slug))
        )

    items = ''.join(f'<a class="docs-index-item" href="/components/{name}/"><small>Neo-brutalism UI</small><b>{escape(title(name))}</b><span>Live preview · Contract · Accessibility · LLM guidance ↗</span></a>' for name in NAMES)
    static_index = f'<main class="docs-shell"><div class="docs-index-head"><div><span class="kicker">NEO-BRUTALISM UI COMPONENTS</span><h1>61 component docs.<br>One design system.</h1><p>Browse NeoBrutal Rivet, a neo-brutalist React UI design system with live component previews, semantic tokens, accessibility guidance, and agent-readable contracts.</p></div></div><div class="docs-index-grid">{items}</div></main>'
    body = f'''<body class="docs-body"><div class="grid"></div><header class="docs-top"><div class="docs-top-left"><a class="brand" href="/"><span class="mark"><i></i><i></i><i></i></span><span>NeoBrutal <em>Rivet</em></span></a><a class="docs-back" href="/components/">Components</a></div><div class="docs-top-actions"><button class="icon" id="theme" aria-label="Toggle dark mode" onclick="const d=document.documentElement.classList.toggle('dark');localStorage.setItem('rivet-theme',d?'dark':'light')">◐</button><a class="btn gh" href="{SOURCE}">GitHub ↗</a></div></header><div id="docsRoot">{static_index}</div><script src="/docs-app.js"></script></body>'''
    index_ld = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': f'{BASE}/components/',
        'name': 'NeoBrutal Rivet Components',
        'headline': 'Neo-Brutalism UI Components — NeoBrutal Rivet',
        'description': 'Browse all 61 NeoBrutal Rivet component contracts, live previews, accessibility guidance, and LLM-readable documentation.',
        'url': f'{BASE}/components/',
        'isPartOf': {'@id': f'{BASE}/#website'},
        'about': ['neo-brutalism UI', 'neobrutalism design system', 'React UI components'],
    }
    (component_root / 'index.html').write_text(page_shell(body, page_title='Neo-Brutalism UI Components — NeoBrutal Rivet', description='Browse 61 NeoBrutal Rivet React UI component docs with live previews, contracts, accessibility guidance, semantic tokens and LLM-readable instructions.', canonical=f'{BASE}/components/', json_ld=index_ld))

    linker = '''(() => {\n  const wire = () => {\n    document.querySelectorAll('[data-demo="expand"][data-component]').forEach(button => {\n      const slug = button.dataset.component;\n      button.removeAttribute('data-demo');\n      button.textContent = 'Open docs ↗';\n      button.onclick = () => { location.href = `/components/${slug}/`; };\n    });\n    document.querySelectorAll('.component-card-foot a[href*="registry/manifest.json"]').forEach(link => {\n      const slug = link.closest('[data-name]')?.dataset.name;\n      if (!slug) return;\n      link.href = `/components/${slug}/`;\n      link.removeAttribute('target');\n      link.removeAttribute('rel');\n      link.textContent = 'Docs';\n    });\n  };\n  wire();\n  const grid = document.querySelector('#componentGrid');\n  if (grid) new MutationObserver(wire).observe(grid, {childList:true, subtree:true});\n})();\n'''
    (ROOT / 'docs-linker.js').write_text(linker)

    index = ROOT / 'index.html'
    text = index.read_text()
    if 'docs-linker.js' not in text:
        text = text.replace('<script src="app.js"></script>', '<script src="app.js"></script><script src="docs-linker.js"></script>')
        index.write_text(text)

    urls = [f'{BASE}/', f'{BASE}/components/'] + [f'{BASE}/components/{name}/' for name in NAMES]
    sitemap = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for i, url in enumerate(urls):
        priority = '1.0' if i == 0 else ('0.9' if i == 1 else '0.7')
        sitemap.append(f'  <url><loc>{url}</loc><changefreq>weekly</changefreq><priority>{priority}</priority></url>')
    sitemap.append('</urlset>')
    (ROOT / 'sitemap.xml').write_text('\n'.join(sitemap) + '\n')
    write_llm_indexes()


if __name__ == '__main__':
    main()
