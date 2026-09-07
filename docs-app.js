const DOCS_SOURCE='https://github.com/NeoBrutalRivet/NeoBrutal-Rivet';
const human=s=>s.replaceAll('-',' ');
const pascal=s=>s.split('-').map(x=>x.charAt(0).toUpperCase()+x.slice(1)).join('');
const escapeHtml=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

const categoryGuidance={
  form:['Keep a visible label or an accessible name for every control.','Preserve keyboard operation, focus-visible styling, disabled states, and invalid/error messaging.','Do not communicate selection or validation using color alone.'],
  overlay:['Move focus into the overlay when it opens and restore focus to the trigger when it closes.','Support Escape where the pattern allows it, and provide an obvious close/cancel action.','Use an accessible title/description and prevent background content from becoming an accidental focus target.'],
  navigation:['Expose the current item or active state semantically, not only visually.','Keep the expected Tab/arrow-key behavior for the navigation pattern.','Maintain clear focus-visible states and logical reading order.'],
  content:['Use semantic HTML that matches the content meaning and reading order.','Keep interactive children independently focusable and clearly labelled.','Avoid using color, icon shape, or position as the only source of meaning.'],
  layout:['Preserve document semantics even when the visual layout changes.','Do not clip focus rings, menus, or content when containers resize or scroll.','Resizable interactions should have keyboard-accessible alternatives where applicable.'],
  'feedback-data':['Pair color with text, icons, labels, or values so status remains understandable.','Dynamic status should use appropriate live-region behavior without becoming noisy.','Charts and progress indicators need a text equivalent for the important value or trend.'],
  utility:['Keep the utility discoverable, labelled, and keyboard operable when it is interactive.','Prefer native semantics before adding custom ARIA.','Preserve focus-visible and reduced-motion behavior.']
};
const specificA11y={
  accordion:['Triggers should be buttons with aria-expanded reflecting the open state.','Each trigger must identify the content region it controls.'],
  'alert-dialog':['Initial focus should land on a safe, meaningful control; destructive confirmation should be explicit.','Describe the irreversible consequence before the destructive action.'],
  checkbox:['Expose checked, unchecked, and disabled states semantically.'],
  'radio-group':['Exactly one option should be selected in a single-choice group, with arrow-key behavior preserved.'],
  switch:['Expose the on/off state programmatically and give the switch a stable accessible name.'],
  tabs:['Use tab, tablist, and tabpanel semantics with the expected arrow-key behavior.'],
  tooltip:['Tooltips must also appear on keyboard focus, not only hover.','Do not put required interactive content inside a tooltip.'],
  table:['Use real table headers and scope relationships when the content is tabular.','Provide a caption or nearby heading when the table needs context.'],
  carousel:['Controls need accessible names and the current slide should be understandable without motion.','Avoid auto-advancing content that users cannot pause.'],
  calendar:['Date navigation and day selection should be fully keyboard operable.','Announce the selected date and month changes without excessive live-region noise.'],
  slider:['Expose min, max, current value, and an accessible name; support arrow-key changes.'],
  progress:['Provide the current value in text or programmatically; indeterminate progress should not invent a percentage.'],
  dialog:['Trap focus while open and restore focus to the trigger when closed.'],
  drawer:['Treat modal drawers like dialogs for focus management when background interaction is blocked.'],
  sheet:['Treat modal sheets like dialogs for focus management when background interaction is blocked.'],
  'context-menu':['Opening, arrow-key navigation, Escape, and focus return should follow menu expectations.'],
  'dropdown-menu':['Use menu semantics only for action menus, not general site navigation.'],
  'navigation-menu':['Keep keyboard navigation predictable and expose expanded/current states.']
};

function codeFor(c){
  return `// Source-first usage during the public alpha\nimport * as ${pascal(c.name)} from "@/components/ui/${c.name}"\n\n// Reuse the exports that already exist in this module.\n// Do not recreate the primitive or bypass Rivet semantic tokens.`;
}
function llmFor(c){
  return `1. Read AGENTS.md and docs/LLM-GUIDE.md.\n2. Discover "${c.name}" in registry/manifest.json before generating UI.\n3. Reuse ${c.path.replace('./','')} and its existing slots.\n4. Use semantic tokens only; do not add arbitrary product hex values.\n5. Preserve data-slot names, keyboard behavior, focus-visible states, dark mode, and reduced motion.\n6. Compose this primitive into the product; do not fork a second ${c.name} implementation.`;
}
function mountTabs(){
  document.addEventListener('click',e=>{
    const tab=e.target.closest('[data-doc-tab]');
    if(tab){
      document.querySelectorAll('[data-doc-tab]').forEach(x=>x.classList.toggle('active',x===tab));
      document.querySelectorAll('[data-doc-panel]').forEach(x=>x.classList.toggle('active',x.dataset.docPanel===tab.dataset.docTab));
    }
    const copy=e.target.closest('[data-copy]');
    if(copy){
      const el=document.querySelector(copy.dataset.copy);
      navigator.clipboard?.writeText(el?.textContent||'');
      const old=copy.textContent; copy.textContent='Copied'; setTimeout(()=>copy.textContent=old,1200);
    }
  });
}
function renderComponent(manifest,slug){
  const c=manifest.components.find(x=>x.name===slug);
  if(!c){ location.href='/components/'; return; }
  document.title=`${human(c.name)} — NeoBrutal Rivet`;
  const meta=document.querySelector('meta[name="description"]'); if(meta) meta.content=`Live preview, contract, accessibility and LLM guidance for the NeoBrutal Rivet ${human(c.name)} component.`;
  const article=document.querySelector(`#componentGrid [data-name="${CSS.escape(slug)}"]`);
  const previewHtml=article?.querySelector('.component-preview')?.innerHTML||`<div class="demo-empty"><b>${escapeHtml(human(slug))}</b><span>Preview unavailable.</span></div>`;
  const i=manifest.components.findIndex(x=>x.name===slug), prev=manifest.components[(i-1+manifest.components.length)%manifest.components.length], next=manifest.components[(i+1)%manifest.components.length];
  const a11y=[...(specificA11y[c.name]||[]),...(categoryGuidance[c.category]||categoryGuidance.utility)];
  const sourcePath=c.path.replace('./','')+'.tsx';
  const root=document.querySelector('#docsRoot');
  root.innerHTML=`<main class="docs-shell">
    <div class="docs-breadcrumb"><a href="/components/">Components</a><span>›</span><b>${escapeHtml(human(c.name))}</b></div>
    <section class="docs-hero"><div><h1>${escapeHtml(human(c.name))}</h1><p>A live Rivet preview with the component contract, source-first usage, accessibility checks, and instructions for coding agents.</p></div><div class="docs-badges"><span class="demo-pill lime">Public alpha</span><span class="demo-pill lavender">${escapeHtml(human(c.category))}</span></div></section>
    <div class="docs-layout"><div class="docs-main">
      <nav class="docs-tabs" aria-label="Component documentation tabs"><button class="docs-tab active" data-doc-tab="preview">Preview</button><button class="docs-tab" data-doc-tab="usage">Usage</button><button class="docs-tab" data-doc-tab="contract">Contract / API</button><button class="docs-tab" data-doc-tab="accessibility">Accessibility</button><button class="docs-tab" data-doc-tab="llm">For LLMs</button></nav>
      <section class="docs-panel active" data-doc-panel="preview"><div class="docs-card"><div class="docs-card-head"><b>Live preview</b><span>Interactive where behavior matters</span></div><div class="docs-preview-stage">${previewHtml}</div><div class="docs-preview-note">This is the live visual-contract demo used by the Rivet showcase. React source remains public alpha and the source file is the implementation source of truth.</div></div></section>
      <section class="docs-panel" data-doc-panel="usage"><div class="docs-copy"><h2>Use the existing primitive.</h2><p>Rivet is source-first during the public alpha. Import from the existing module in your project and compose its exports instead of recreating the component.</p><div class="docs-code-wrap"><div class="docs-code-top"><span>${escapeHtml(sourcePath)}</span><button class="docs-copy-btn" data-copy="#usageCode">Copy</button></div><code class="docs-code" id="usageCode">${escapeHtml(codeFor(c))}</code></div><p>Exact named exports can evolve during the alpha, so inspect the source file before relying on an assumed export name.</p></div></section>
      <section class="docs-panel" data-doc-panel="contract"><div class="docs-copy"><h2>Contract / API</h2><div class="docs-facts"><div class="docs-fact"><small>Category</small><b>${escapeHtml(human(c.category))}</b></div><div class="docs-fact"><small>Source</small><b>${escapeHtml(sourcePath)}</b></div><div class="docs-fact"><small>Slots</small><b>${c.slots.length}</b></div></div><h3>Stable data slots</h3><p>Slots are the machine-readable contract Rivet uses to keep visual styling and agent composition consistent.</p><div class="docs-slots">${c.slots.length?c.slots.map(s=>`<span class="docs-slot">${escapeHtml(s)}</span>`).join(''):'<span class="docs-slot">No named slots registered</span>'}</div></div></section>
      <section class="docs-panel" data-doc-panel="accessibility"><div class="docs-copy"><h2>Accessibility checklist</h2><p>These checks describe what should remain true when this primitive is composed into a product.</p><ul>${a11y.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></div></section>
      <section class="docs-panel" data-doc-panel="llm"><div class="docs-copy"><h2>Instructions for coding agents</h2><p>Rivet follows a discover-before-invent workflow. An agent should treat the registry and existing source as the contract.</p><div class="docs-code-wrap"><div class="docs-code-top"><span>agent://rivet/${escapeHtml(c.name)}</span><button class="docs-copy-btn" data-copy="#llmCode">Copy</button></div><code class="docs-code" id="llmCode">${escapeHtml(llmFor(c))}</code></div></div></section>
      <div class="docs-prevnext"><a href="/components/${prev.name}/">← ${escapeHtml(human(prev.name))}</a><a href="/components/${next.name}/">${escapeHtml(human(next.name))} →</a></div>
    </div><aside class="docs-aside"><div class="docs-aside-card"><h3>Component</h3><div class="docs-aside-list"><div class="docs-aside-row"><span>Status</span><b>Public alpha</b></div><div class="docs-aside-row"><span>Category</span><b>${escapeHtml(human(c.category))}</b></div><div class="docs-aside-row"><span>Slots</span><b>${c.slots.length}</b></div><div class="docs-aside-row"><span>Themes</span><b>Light · Dark · System</b></div></div></div><div class="docs-aside-card"><h3>Links</h3><div class="docs-aside-links"><a href="${DOCS_SOURCE}/blob/main/${sourcePath}" target="_blank" rel="noreferrer"><span>View source</span><b>↗</b></a><a href="${DOCS_SOURCE}/blob/main/registry/manifest.json" target="_blank" rel="noreferrer"><span>Registry contract</span><b>↗</b></a><a href="${DOCS_SOURCE}/blob/main/docs/LLM-GUIDE.md" target="_blank" rel="noreferrer"><span>LLM guide</span><b>↗</b></a></div></div></aside></div>
  </main>`;
}
function renderIndex(manifest){
  document.title='Components — NeoBrutal Rivet';
  const root=document.querySelector('#docsRoot');
  root.innerHTML=`<main class="docs-shell"><div class="docs-index-head"><div><span class="kicker">COMPONENT DOCS</span><h1>61 components.<br>One contract.</h1></div><div class="docs-index-search"><label for="docsSearch">FIND A COMPONENT</label><input id="docsSearch" type="search" placeholder="Try dialog or button"></div></div><div class="docs-index-grid" id="docsIndexGrid"></div></main>`;
  const grid=document.querySelector('#docsIndexGrid'), input=document.querySelector('#docsSearch');
  const draw=(q='')=>{const x=q.toLowerCase().trim(); const list=manifest.components.filter(c=>c.name.includes(x)||c.category.includes(x)); grid.innerHTML=list.map(c=>`<a class="docs-index-item" href="/components/${c.name}/"><small>${escapeHtml(human(c.category))}</small><b>${escapeHtml(human(c.name))}</b><span>${c.slots.length} slots · Open docs ↗</span></a>`).join('')||'<div class="component-no-results"><b>No matching components.</b><span>Try another name or category.</span></div>';};
  draw(); input.addEventListener('input',e=>draw(e.target.value));
}
async function initDocs(){
  mountTabs();
  try{const manifest=await fetch('https://raw.githubusercontent.com/NeoBrutalRivet/NeoBrutal-Rivet/main/registry/manifest.json',{cache:'no-cache'}).then(r=>{if(!r.ok) throw new Error('registry'); return r.json()}); const slug=document.body.dataset.component; if(slug) renderComponent(manifest,slug); else renderIndex(manifest);}catch(e){document.querySelector('#docsRoot').innerHTML='<main class="docs-shell"><div class="docs-card"><div class="docs-preview-note">The component registry could not be loaded. Refresh the page or open the source repository.</div></div></main>';}
}
initDocs();
