const rivetStyles = document.createElement('link');
rivetStyles.rel = 'stylesheet';
rivetStyles.href = 'components.css';
document.head.appendChild(rivetStyles);

const components = [
  ['accordion','content'],['alert-dialog','overlay'],['alert','content'],['aspect-ratio','layout'],
  ['attachment','content'],['avatar','content'],['badge','content'],['breadcrumb','navigation'],
  ['bubble','content'],['button-group','utility'],['button','form'],['calendar','feedback-data'],
  ['card','content'],['carousel','layout'],['chart','feedback-data'],['checkbox','form'],
  ['collapsible','layout'],['combobox','form'],['command','overlay'],['context-menu','overlay'],
  ['dialog','overlay'],['direction','utility'],['drawer','overlay'],['dropdown-menu','overlay'],
  ['empty','content'],['field','form'],['form','form'],['hover-card','overlay'],
  ['input-group','form'],['input-otp','form'],['input','form'],['item','content'],['kbd','content'],
  ['label','form'],['marker','content'],['menubar','navigation'],['message-scroller','content'],
  ['message','content'],['native-select','form'],['navigation-menu','navigation'],
  ['pagination','navigation'],['popover','overlay'],['progress','feedback-data'],['radio-group','form'],
  ['resizable','layout'],['scroll-area','layout'],['select','form'],['separator','layout'],
  ['sheet','overlay'],['sidebar','navigation'],['skeleton','feedback-data'],['slider','form'],
  ['sonner','utility'],['spinner','feedback-data'],['switch','form'],['table','content'],
  ['tabs','navigation'],['textarea','form'],['toggle-group','form'],['toggle','form'],['tooltip','overlay']
].map(([name, category]) => ({ name, category }));

const label = n => n.replaceAll('-', ' ');
const esc = s => s.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

function preview(name) {
  const p = {
    'accordion': `<div class="demo-stack demo-accordion"><button data-demo="accordion">What is Rivet?<b>−</b></button><div class="demo-answer">A fluid neo-brutalist UI system.</div><button data-demo="accordion">Can I theme it?<b>+</b></button><div class="demo-answer">Yes — semantic tokens drive the surface.</div></div>`,
    'alert-dialog': `<div class="demo-center"><button class="demo-btn demo-danger" data-overlay="alert-dialog">Delete project</button><small>Confirmation before destructive actions.</small></div>`,
    'alert': `<div class="demo-alert"><b>Heads up</b><span>Your changes are saved locally.</span></div>`,
    'aspect-ratio': `<div class="demo-ratio"><span>16:9</span><div></div></div>`,
    'attachment': `<div class="demo-file"><div class="demo-file-icon">PDF</div><div><b>brand-guide.pdf</b><small>2.4 MB</small></div><button>×</button></div>`,
    'avatar': `<div class="demo-row demo-avatars"><span>AK</span><span>RM</span><span>JS</span><i>+4</i></div>`,
    'badge': `<div class="demo-row demo-wrap"><span class="demo-pill lavender">Beta</span><span class="demo-pill lime">Ready</span><span class="demo-pill coral">Needs review</span></div>`,
    'breadcrumb': `<div class="demo-breadcrumb"><a>Home</a><b>›</b><a>Docs</a><b>›</b><span>Button</span></div>`,
    'bubble': `<div class="demo-bubble">Ship the homepage today?<span>👍 3</span></div>`,
    'button-group': `<div class="demo-button-group"><button>B</button><button>I</button><button>U</button></div>`,
    'button': `<div class="demo-row demo-wrap"><button class="demo-btn demo-primary">Create</button><button class="demo-btn">Cancel</button></div>`,
    'calendar': `<div class="demo-calendar"><div><b>September 2026</b><span>‹ ›</span></div><small>Mo Tu We Th Fr Sa Su</small><div class="demo-days">${Array.from({length:14},(_,i)=>`<i class="${i===6?'on':''}">${i+1}</i>`).join('')}</div></div>`,
    'card': `<div class="demo-card"><span class="demo-pill lime">NEW</span><h4>Launch checklist</h4><p>Five tasks before release.</p><button class="demo-btn demo-primary">Open</button></div>`,
    'carousel': `<div class="demo-carousel"><button data-demo="carousel-prev">‹</button><div><small>CASE STUDY</small><b data-carousel-title>Homepage system</b><span data-carousel-count>1 / 3</span></div><button data-demo="carousel-next">›</button></div>`,
    'chart': `<div class="demo-chart"><i style="height:34%"></i><i style="height:62%"></i><i style="height:45%"></i><i style="height:82%"></i><i style="height:70%"></i></div>`,
    'checkbox': `<label class="demo-check"><button data-demo="checkbox" class="checked" aria-pressed="true">✓</button><span>Send me release notes</span></label>`,
    'collapsible': `<div class="demo-collapse"><button data-demo="collapse">Advanced settings <b>+</b></button><div>Cache · Retries · Region</div></div>`,
    'combobox': `<div class="demo-combobox"><input value="React" aria-label="Framework"><button>⌄</button><div><span>React</span><span>Next.js</span><span>Astro</span></div></div>`,
    'command': `<div class="demo-command"><div>⌕ <input placeholder="Type a command…"></div><span><b>New project</b><kbd>⌘N</kbd></span><span><b>Open docs</b><kbd>⌘K</kbd></span></div>`,
    'context-menu': `<div class="demo-context"><div class="demo-context-target">Right click area</div><div class="demo-menu"><span>Duplicate <kbd>⌘D</kbd></span><span>Rename</span><span class="danger">Delete</span></div></div>`,
    'dialog': `<div class="demo-center"><button class="demo-btn demo-primary" data-overlay="dialog">Open dialog</button><small>Modal content with clear actions.</small></div>`,
    'direction': `<div class="demo-direction"><div><small>LTR</small><b>Rivet →</b></div><div dir="rtl"><small>RTL</small><b>Rivet ←</b></div></div>`,
    'drawer': `<div class="demo-center"><button class="demo-btn" data-overlay="drawer">Open drawer</button><div class="demo-drawer-mini"><i></i><b>Quick actions</b></div></div>`,
    'dropdown-menu': `<div class="demo-dropdown"><button class="demo-btn">Actions⌄</button><div class="demo-menu"><span>Edit</span><span>Duplicate</span><span>Archive</span></div></div>`,
    'empty': `<div class="demo-empty"><div>＋</div><b>No projects yet</b><span>Create your first project to get started.</span><button class="demo-btn demo-primary">Create project</button></div>`,
    'field': `<div class="demo-field"><label>Workspace name</label><input value="Design team"><small>Visible to everyone in this workspace.</small></div>`,
    'form': `<div class="demo-form"><label>Email<input value="hello@example.com"></label><label>Role<input value="Designer"></label><button class="demo-btn demo-primary">Save</button></div>`,
    'hover-card': `<div class="demo-hover"><a>@rivet</a><div><b>NeoBrutal Rivet</b><span>Design system for humans and LLMs.</span></div></div>`,
    'input-group': `<div class="demo-input-group"><span>https://</span><input value="rivet.dev"><button>Copy</button></div>`,
    'input-otp': `<div class="demo-otp"><i>4</i><i>2</i><i>8</i><b>—</b><i>1</i><i>7</i><i>9</i></div>`,
    'input': `<input class="demo-input" value="Search components" aria-label="Input preview">`,
    'item': `<div class="demo-item"><span class="demo-item-icon">R</span><div><b>Rivet tokens</b><small>Updated 3 min ago</small></div><button>•••</button></div>`,
    'kbd': `<div class="demo-row demo-kbd"><kbd>⌘</kbd><kbd>K</kbd><span>Open command menu</span></div>`,
    'label': `<div class="demo-labels"><label>Project name</label><span>Required</span><input value="NeoBrutal Rivet"></div>`,
    'marker': `<div class="demo-marker-wrap"><div class="demo-marker"><i>●</i><b>New</b></div><div class="demo-marker"><i class="lime">✓</i><b>Ready</b></div></div>`,
    'menubar': `<div class="demo-menubar"><button>File</button><button>Edit</button><button>View</button><button>Help</button><div class="demo-menu"><span>New file <kbd>⌘N</kbd></span><span>Open… <kbd>⌘O</kbd></span></div></div>`,
    'message-scroller': `<div class="demo-scroller"><div class="demo-message mine">Can you review this?</div><div class="demo-message">Yep — opening it now.</div><button>↓ Newest</button></div>`,
    'message': `<div class="demo-chat"><span class="demo-chat-avatar">AK</span><div><small>Alex · 2m</small><p>The component gallery is live.</p></div></div>`,
    'native-select': `<label class="demo-field">Plan<select><option>Starter</option><option>Pro</option><option>Team</option></select></label>`,
    'navigation-menu': `<div class="demo-nav"><a class="active">Overview</a><a>Components</a><a>Tokens</a><a>Docs</a></div>`,
    'pagination': `<div class="demo-pagination"><button>←</button><button>1</button><button class="active">2</button><button>3</button><button>→</button></div>`,
    'popover': `<div class="demo-popover"><button class="demo-btn" data-demo="popover">Share</button><div class="demo-popover-panel"><b>Share project</b><span>Anyone with the link can view.</span></div></div>`,
    'progress': `<div class="demo-progress"><div><b>Uploading</b><span>72%</span></div><i><b style="width:72%"></b></i></div>`,
    'radio-group': `<div class="demo-radio"><label><button class="on" data-demo="radio"></button>Light</label><label><button data-demo="radio"></button>Dark</label><label><button data-demo="radio"></button>System</label></div>`,
    'resizable': `<div class="demo-resize"><div>Sidebar</div><i>⋮</i><div>Canvas</div></div>`,
    'scroll-area': `<div class="demo-scroll"><div>${Array.from({length:8},(_,i)=>`<span>Activity item ${i+1}</span>`).join('')}</div><i><b></b></i></div>`,
    'select': `<div class="demo-select"><button>Lavender <b>⌄</b></button><div><span>✓ Lavender</span><span>Lime</span><span>Coral</span></div></div>`,
    'separator': `<div class="demo-separators"><span>Account</span><i></i><span>Billing</span><b></b><span>Security</span></div>`,
    'sheet': `<div class="demo-center"><button class="demo-btn demo-primary" data-overlay="sheet">Open sheet</button><div class="demo-sheet-mini"><b>Inspector</b><span>Properties</span><span>Spacing</span></div></div>`,
    'sidebar': `<div class="demo-sidebar"><aside><b>RIVET</b><a class="on">⌂ Home</a><a>◫ Components</a><a>⚙ Settings</a></aside><main><small>Workspace</small><b>Dashboard</b></main></div>`,
    'skeleton': `<div class="demo-skeleton"><i></i><div><b></b><b></b><b></b></div></div>`,
    'slider': `<div class="demo-slider"><div><b>Shadow</b><span data-range-value>6px</span></div><input type="range" min="0" max="12" value="6" data-demo="range"></div>`,
    'sonner': `<div class="demo-center"><button class="demo-btn demo-primary" data-demo="toast">Show toast</button><div class="demo-toast-mini"><b>Saved</b><span>Your changes are live.</span></div></div>`,
    'spinner': `<div class="demo-spinner-wrap"><i class="demo-spinner"></i><b>Loading preview…</b></div>`,
    'switch': `<label class="demo-switch-row"><button class="demo-switch on" data-demo="switch" aria-pressed="true"><i></i></button><span>Notifications</span></label>`,
    'table': `<div class="demo-table"><div class="head"><b>Name</b><b>Status</b><b>Owner</b></div><div><span>Homepage</span><span class="demo-pill lime">Ready</span><span>AK</span></div><div><span>Billing</span><span class="demo-pill lavender">Review</span><span>RM</span></div></div>`,
    'tabs': `<div class="demo-tabs"><div><button class="active" data-demo="tab" data-tab="preview">Preview</button><button data-demo="tab" data-tab="code">Code</button><button data-demo="tab" data-tab="a11y">A11y</button></div><p data-tab-panel>Live component preview.</p></div>`,
    'textarea': `<textarea class="demo-textarea" rows="4">Write a short project note…</textarea>`,
    'toggle-group': `<div class="demo-toggle-group"><button class="on" data-demo="toggle-group">Left</button><button data-demo="toggle-group">Center</button><button data-demo="toggle-group">Right</button></div>`,
    'toggle': `<button class="demo-toggle on" data-demo="toggle">★ Favorite</button>`,
    'tooltip': `<div class="demo-tooltip"><button class="demo-btn">Hover me</button><span>Helpful context</span></div>`
  };
  return p[name] || `<div class="demo-empty"><b>${esc(label(name))}</b><span>Live Rivet preview</span></div>`;
}

const grid = document.querySelector('#componentGrid');
const search = document.querySelector('#search');
const componentSection = document.querySelector('#components');
const title = componentSection?.querySelector('.big');
if (title) title.innerHTML = '61 live previews.<br>One visual grammar.';

const toolbar = document.createElement('div');
toolbar.className = 'component-toolbar';
toolbar.innerHTML = `
  <div class="component-intro"><span class="demo-pill lime">LIVE GALLERY</span><p>Every registered contract now has a Rivet-styled visual preview. Controls are interactive where that helps explain behavior. React source migration remains public alpha.</p></div>
  <div class="component-filters" role="group" aria-label="Filter components">
    ${['all','form','overlay','navigation','content','layout','feedback-data','utility'].map((c,i)=>`<button class="${i===0?'active':''}" data-filter="${c}">${label(c)}</button>`).join('')}
  </div>`;
grid.before(toolbar);

let activeFilter = 'all';
function draw(q='') {
  const x = q.toLowerCase().trim();
  const list = components.filter(c =>
    (activeFilter === 'all' || c.category === activeFilter) &&
    (c.name.includes(x) || c.category.includes(x))
  );
  grid.innerHTML = list.map(c => `
    <article class="component" data-name="${c.name}" data-category="${c.category}">
      <div class="component-card-head"><div><small>${esc(label(c.category))}</small><strong>${esc(label(c.name))}</strong></div><span>LIVE</span></div>
      <div class="component-preview">${preview(c.name)}</div>
      <div class="component-card-foot">
        <button data-demo="expand" data-component="${c.name}">View larger ↗</button>
        <a href="https://github.com/NeoBrutalRivet/NeoBrutal-Rivet/blob/main/registry/manifest.json" target="_blank" rel="noreferrer">Contract</a>
      </div>
    </article>`).join('');
  if (!list.length) grid.innerHTML = `<div class="component-no-results"><b>No matching components.</b><span>Try a different name or category.</span></div>`;
}
draw();

search?.addEventListener('input', e => draw(e.target.value));
toolbar.addEventListener('click', e => {
  const b = e.target.closest('[data-filter]');
  if (!b) return;
  activeFilter = b.dataset.filter;
  toolbar.querySelectorAll('[data-filter]').forEach(x => x.classList.toggle('active', x === b));
  draw(search?.value || '');
});

document.querySelector('#theme').onclick = () => {
  const d = document.documentElement.classList.toggle('dark');
  localStorage.setItem('rivet-theme', d ? 'dark' : 'light');
};

const play = document.querySelector('#playbox');
document.querySelectorAll('.swatch').forEach(b => b.onclick = () => {
  document.querySelectorAll('.swatch').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  play.dataset.accent = b.dataset.accent;
});

function ensureOverlay() {
  let overlay = document.querySelector('#demoOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'demoOverlay';
    overlay.className = 'demo-overlay-shell';
    overlay.innerHTML = `<div class="demo-overlay-backdrop" data-close-overlay></div><div class="demo-overlay-content" role="dialog" aria-modal="true"><button class="demo-overlay-close" data-close-overlay aria-label="Close">×</button><div id="demoOverlayBody"></div></div>`;
    document.body.appendChild(overlay);
  }
  return overlay;
}

function openOverlay(name, mode='preview') {
  const shell = ensureOverlay();
  const body = shell.querySelector('#demoOverlayBody');
  const c = components.find(x => x.name === name) || {name, category:'component'};
  const content = mode === 'preview'
    ? `<div class="demo-detail-head"><span class="demo-pill lime">${esc(label(c.category))}</span><h3>${esc(label(c.name))}</h3><p>Live showcase preview using the Rivet visual contract.</p></div><div class="demo-detail-stage">${preview(name)}</div><a class="demo-btn demo-primary demo-detail-link" href="https://github.com/NeoBrutalRivet/NeoBrutal-Rivet/blob/main/registry/manifest.json" target="_blank" rel="noreferrer">Open contract ↗</a>`
    : overlayContent(name);
  body.innerHTML = content;
  shell.classList.add('open');
  document.body.classList.add('overlay-open');
}

function overlayContent(name) {
  if (name === 'alert-dialog') return `<div class="demo-modal-card"><span class="demo-pill coral">DANGER ZONE</span><h3>Delete this project?</h3><p>This removes the project for everyone. This action cannot be undone.</p><div><button class="demo-btn" data-close-overlay>Cancel</button><button class="demo-btn demo-danger" data-close-overlay>Delete project</button></div></div>`;
  if (name === 'drawer') return `<div class="demo-drawer-live"><i></i><h3>Quick actions</h3><button class="demo-btn demo-primary">Create issue</button><button class="demo-btn">Copy link</button></div>`;
  if (name === 'sheet') return `<div class="demo-sheet-live"><span class="demo-pill lavender">INSPECTOR</span><h3>Component settings</h3><label>Radius<input value="8px"></label><label>Shadow<input value="6px 6px"></label><button class="demo-btn demo-primary" data-close-overlay>Apply</button></div>`;
  return `<div class="demo-modal-card"><span class="demo-pill lavender">DIALOG</span><h3>Edit project</h3><p>Keep labels clear and actions obvious.</p><label>Project name<input value="NeoBrutal Rivet"></label><div><button class="demo-btn" data-close-overlay>Cancel</button><button class="demo-btn demo-primary" data-close-overlay>Save changes</button></div></div>`;
}

let carouselIndex = 0;
const carouselNames = ['Homepage system','Billing workspace','Agent dashboard'];

document.addEventListener('click', e => {
  const expand = e.target.closest('[data-demo="expand"]');
  if (expand) return openOverlay(expand.dataset.component);

  const overlayTrigger = e.target.closest('[data-overlay]');
  if (overlayTrigger) return openOverlay(overlayTrigger.dataset.overlay, 'overlay');

  if (e.target.closest('[data-close-overlay]')) {
    document.querySelector('#demoOverlay')?.classList.remove('open');
    document.body.classList.remove('overlay-open');
    return;
  }

  const action = e.target.closest('[data-demo]');
  if (!action) return;
  const type = action.dataset.demo;

  if (type === 'checkbox') {
    const on = action.classList.toggle('checked');
    action.textContent = on ? '✓' : '';
    action.setAttribute('aria-pressed', String(on));
  }
  if (type === 'switch') {
    const on = action.classList.toggle('on');
    action.setAttribute('aria-pressed', String(on));
  }
  if (type === 'toggle') {
    const on = action.classList.toggle('on');
    action.setAttribute('aria-pressed', String(on));
  }
  if (type === 'accordion') {
    const answer = action.nextElementSibling;
    if (answer?.classList.contains('demo-answer')) {
      const open = answer.classList.toggle('show');
      action.querySelector('b').textContent = open ? '−' : '+';
    }
  }
  if (type === 'collapse') {
    const panel = action.nextElementSibling;
    panel.classList.toggle('show');
    action.querySelector('b').textContent = panel.classList.contains('show') ? '−' : '+';
  }
  if (type === 'radio') {
    const group = action.closest('.demo-radio');
    group.querySelectorAll('button').forEach(b => b.classList.remove('on'));
    action.classList.add('on');
  }
  if (type === 'toggle-group') {
    const group = action.closest('.demo-toggle-group');
    group.querySelectorAll('button').forEach(b => b.classList.remove('on'));
    action.classList.add('on');
  }
  if (type === 'tab') {
    const tabs = action.closest('.demo-tabs');
    tabs.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    action.classList.add('active');
    const copy = {preview:'Live component preview.',code:'Composable primitive contract.',a11y:'Keyboard and focus states documented.'};
    tabs.querySelector('[data-tab-panel]').textContent = copy[action.dataset.tab];
  }
  if (type === 'popover') action.nextElementSibling?.classList.toggle('show');
  if (type === 'carousel-prev' || type === 'carousel-next') {
    carouselIndex = (carouselIndex + (type.endsWith('next') ? 1 : 2)) % 3;
    const card = action.closest('.demo-carousel');
    card.querySelector('[data-carousel-title]').textContent = carouselNames[carouselIndex];
    card.querySelector('[data-carousel-count]').textContent = `${carouselIndex + 1} / 3`;
  }
  if (type === 'toast') {
    let toast = document.querySelector('#liveToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'liveToast';
      toast.className = 'live-toast';
      toast.innerHTML = '<b>Saved</b><span>Your changes are live.</span>';
      document.body.appendChild(toast);
    }
    toast.classList.add('show');
    clearTimeout(window.__rivetToast);
    window.__rivetToast = setTimeout(() => toast.classList.remove('show'), 2200);
  }
});

document.addEventListener('input', e => {
  if (e.target.matches('[data-demo="range"]')) {
    e.target.closest('.demo-slider').querySelector('[data-range-value]').textContent = `${e.target.value}px`;
  }
});
