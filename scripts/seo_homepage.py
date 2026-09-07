from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
index = ROOT / 'index.html'
text = index.read_text()

TITLE = 'NeoBrutal Rivet — Neo-Brutalism UI Design System for React'
DESCRIPTION = 'NeoBrutal Rivet is a neo-brutalist React UI design system with 61 live component previews, semantic tokens, dark mode, accessibility and LLM-readable docs.'

text = re.sub(r'<title>.*?</title>', f'<title>{TITLE}</title>', text, count=1)
text = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{DESCRIPTION}">', text, count=1)
text = re.sub(r'<meta property="og:title" content="[^"]*">', f'<meta property="og:title" content="{TITLE}">', text, count=1)
text = re.sub(r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{DESCRIPTION}">', text, count=1)

if 'name="robots"' not in text:
    text = text.replace('<meta name="theme-color"', '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">\n<meta name="theme-color"', 1)
if 'name="twitter:card"' not in text:
    social = f'<meta name="twitter:card" content="summary"><meta name="twitter:title" content="{TITLE}"><meta name="twitter:description" content="{DESCRIPTION}">\n'
    text = text.replace('<title>', social + '<title>', 1)
if 'rel="describedby"' not in text:
    text = text.replace('<link rel="canonical" href="https://neobrutalrivet.github.io/">', '<link rel="canonical" href="https://neobrutalrivet.github.io/"><link rel="describedby" href="/llms.txt" type="text/markdown"><link rel="alternate" href="/llms-full.txt" type="text/markdown" title="NeoBrutal Rivet LLM documentation index"><link rel="alternate" href="https://raw.githubusercontent.com/NeoBrutalRivet/NeoBrutal-Rivet/main/registry/manifest.json" type="application/json" title="NeoBrutal Rivet component registry">', 1)

structured = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Organization',
            '@id': 'https://neobrutalrivet.github.io/#organization',
            'name': 'NeoBrutal Rivet',
            'url': 'https://neobrutalrivet.github.io/',
            'logo': 'https://neobrutalrivet.github.io/favicon.svg',
            'sameAs': ['https://github.com/NeoBrutalRivet'],
        },
        {
            '@type': 'WebSite',
            '@id': 'https://neobrutalrivet.github.io/#website',
            'name': 'NeoBrutal Rivet',
            'url': 'https://neobrutalrivet.github.io/',
            'description': DESCRIPTION,
            'publisher': {'@id': 'https://neobrutalrivet.github.io/#organization'},
            'keywords': ['neo-brutalism UI', 'neobrutalism design system', 'React UI design system', 'UI components', 'design tokens', 'LLM-readable documentation'],
        },
        {
            '@type': 'SoftwareSourceCode',
            '@id': 'https://neobrutalrivet.github.io/#software',
            'name': 'NeoBrutal Rivet',
            'version': '0.1.0',
            'codeRepository': 'https://github.com/NeoBrutalRivet/NeoBrutal-Rivet',
            'programmingLanguage': ['TypeScript', 'React', 'CSS'],
            'description': 'A public-alpha neo-brutalist React UI design system for humans and coding agents with 61 component contracts and an agent-readable registry.',
            'url': 'https://neobrutalrivet.github.io/',
        },
    ],
}
block = '<script type="application/ld+json" id="rivet-structured-data">' + json.dumps(structured, separators=(',', ':')).replace('</', '<\\/') + '</script>'
if 'id="rivet-structured-data"' not in text:
    text = text.replace('</head>', block + '\n</head>', 1)

text = text.replace('Neo-brutalism,<br><span class="underline">riveted</span> into a system.', 'Neo-brutalism UI,<br><span class="underline">riveted</span> into a design system.')
text = text.replace('A fluid design system with reusable React primitives, hard edges, semantic tokens, light + dark themes, purposeful motion, and a component registry coding agents can actually understand.', 'A neo-brutalist React UI design system with hard edges, semantic tokens, light + dark themes, purposeful motion, 61 live component contracts, and documentation coding agents can actually understand.')
text = text.replace('Rivet turns the recognizable neo-brutalist visual language into reusable rules: tokens first, components second, products last.', 'NeoBrutal Rivet turns the neo-brutalism — also called neobrutalism — UI visual language into reusable React design-system rules: tokens first, components second, products last.')

if 'href="/components/"' not in text:
    text = text.replace('<a class="btn secondary" href="https://github.com/NeoBrutalRivet/NeoBrutal-Rivet/blob/main/registry/manifest.json">Open registry ↗</a>', '<a class="btn primary" href="/components/">Browse all component docs →</a><a class="btn secondary" href="https://github.com/NeoBrutalRivet/NeoBrutal-Rivet/blob/main/registry/manifest.json">Open registry ↗</a>')
if '>LLM index<' not in text:
    text = text.replace('<a href="#top">Top ↑</a>', '<a href="/llms.txt">LLM index</a><a href="#top">Top ↑</a>')

index.write_text(text)
(ROOT / 'robots.txt').write_text('User-agent: *\nAllow: /\n\nSitemap: https://neobrutalrivet.github.io/sitemap.xml\n')
