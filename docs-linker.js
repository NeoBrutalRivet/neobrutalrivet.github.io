(() => {
  const wire = () => {
    document.querySelectorAll('[data-demo="expand"][data-component]').forEach(button => {
      const slug = button.dataset.component;
      button.removeAttribute('data-demo');
      button.textContent = 'Open docs ↗';
      button.onclick = () => { location.href = `/components/${slug}/`; };
    });
    document.querySelectorAll('.component-card-foot a[href*="registry/manifest.json"]').forEach(link => {
      const slug = link.closest('[data-name]')?.dataset.name;
      if (!slug) return;
      link.href = `/components/${slug}/`;
      link.removeAttribute('target');
      link.removeAttribute('rel');
      link.textContent = 'Docs';
    });
  };
  wire();
  const grid = document.querySelector('#componentGrid');
  if (grid) new MutationObserver(wire).observe(grid, {childList:true, subtree:true});
})();
