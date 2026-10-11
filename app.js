const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const gallery = document.querySelector('.projects');
const dialog = document.querySelector('#project-dialog');
let position = 0;
let paused = reducedMotion.matches;
let hovering = false;
let lastTrigger;
const artwork = {
  studio: '<div class="mini-site mini-studio"><div class="mini-header"><b>STUDIO®</b><span>ÍNDICE &nbsp; CONTATO</span></div><div class="mini-studio-title">Forma.<br><em>Sem limites.</em></div><div class="sculpture-image"></div><span class="mini-foot">ESTÚDIO CRIATIVO & DESIGN INDEPENDENTE</span></div>',
  objects: '<div class="mini-site mini-objects"><div class="mini-header"><b>objects.</b><span>COLEÇÃO &nbsp; SACOLA (0)</span></div><div class="object-title">Menos, mas<br><em>melhor.</em></div><div class="object-image"></div><div class="object-caption"><span>OBJETOS PARA O COTIDIANO</span><span>01 — 03</span></div></div>',
  atelier: '<div class="mini-site mini-atelier"><div class="mini-header"><b>ATELIER</b><span>COLEÇÃO 01</span></div><div class="fashion-image"></div><div class="atelier-title">Uma nova<br><em>perspectiva.</em></div><span class="mini-foot">EDITORIAL / IDENTIDADE / EXPRESSÃO</span></div>'
};
function fillCard(card, project) {
  const art = document.createElement('div'); art.className = 'project-art';
  if (project.image) {
    const img = document.createElement('img'); img.src = project.image; img.alt = project.title; art.append(img);
  } else art.innerHTML = artwork[project.art] || artwork.studio;
  const top = document.createElement('div'); top.className = 'mock-nav';
  const label = document.createElement('span'); label.textContent = project.title.toUpperCase();
  const mark = document.createElement('span'); mark.textContent = '↗'; top.append(label, mark);
  const caption = document.createElement('div'); caption.className = 'mock-caption'; caption.textContent = project.category;
  const subtitle = document.createElement('span'); subtitle.textContent = project.demo ? 'DEMONSTRAÇÃO' : project.title; caption.append(subtitle);
  card.append(art, top, caption);
}
function openProject(project, trigger) {
  lastTrigger = trigger;
  const preview = document.querySelector('#project-preview'); preview.replaceChildren();
  const card = document.createElement('div'); card.className = 'project project-' + ({studio:'one',objects:'two',atelier:'three'}[project.art] || 'one');
  fillCard(card, project); preview.append(card);
  document.querySelector('#project-title').textContent = project.title;
  document.querySelector('#project-category').textContent = project.category;
  document.querySelector('#project-description').textContent = project.description || '';
  const link = document.querySelector('#project-link');
  const validUrl = project.url && /^https?:\/\//.test(project.url); link.hidden = !validUrl;
  if (validUrl) link.href = project.url; else link.removeAttribute('href');
  dialog.showModal();
}
function renderGallery() {
  gallery.replaceChildren();
  for (let slot = 0; slot < Math.min(3, projects.length); slot++) {
    const project = projects[(position + slot) % projects.length];
    const card = document.createElement('button'); card.type = 'button';
    card.className = 'project project-' + ({studio:'one',objects:'two',atelier:'three'}[project.art] || 'one') + ' gallery-card';
    card.setAttribute('aria-label', `Ver ${project.title}${project.demo ? ' — demonstração' : ''}`);
    fillCard(card, project);
    card.addEventListener('click', () => openProject(project, card));
    card.addEventListener('pointermove', event => {
      if (reducedMotion.matches || event.pointerType === 'touch') return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--rx', `${(0.5 - (event.clientY - rect.top) / rect.height) * 9}deg`);
      card.style.setProperty('--ry', `${((event.clientX - rect.left) / rect.width - 0.5) * 9}deg`);
    });
    card.addEventListener('pointerleave', () => { card.style.setProperty('--rx','0deg'); card.style.setProperty('--ry','0deg'); });
    gallery.append(card);
  }
  document.querySelector('#gallery-position').textContent = `${String(position + 1).padStart(2,'0')} / ${String(projects.length).padStart(2,'0')}`;
}
function advance(direction) { if (!projects.length) return; position = (position + direction + projects.length) % projects.length; renderGallery(); }
function showPage() {
  const requested = location.hash.slice(1);
  const page = ['portfolio','contatos','servicos'].includes(requested) ? requested : 'portfolio';
  for (const section of document.querySelectorAll('main > section')) section.hidden = section.id !== page;
  for (const link of document.querySelectorAll('[data-page]')) {
    const active = link.dataset.page === page; link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current','page'); else link.removeAttribute('aria-current');
  }
  if (dialog.open) dialog.close(); window.scrollTo(0,0);
}
document.querySelector('#previous').addEventListener('click', () => advance(-1));
document.querySelector('#next').addEventListener('click', () => advance(1));
const autoplay = document.querySelector('#autoplay');
function updatePause() { autoplay.textContent = paused ? '▷' : 'Ⅱ'; autoplay.setAttribute('aria-pressed',String(paused)); autoplay.setAttribute('aria-label',paused ? 'Ativar troca automática' : 'Pausar troca automática'); }
autoplay.addEventListener('click', () => { paused = !paused; updatePause(); });
reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; updatePause(); });
gallery.addEventListener('pointerenter', () => { hovering = true; });
gallery.addEventListener('pointerleave', () => { hovering = false; });
setInterval(() => {
  if (!paused && !hovering && !document.hidden && !dialog.open && !document.querySelector('#portfolio').hidden && !gallery.contains(document.activeElement)) advance(1);
}, 5500);
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { if (lastTrigger?.isConnected) lastTrigger.focus(); });
for (const link of document.querySelectorAll('.hire')) {
  const message = `Olá, Kauã! Tenho interesse em um ${link.dataset.service.toLowerCase()} (${link.dataset.price}). Podemos conversar sobre o projeto?`;
  link.href = 'https://wa.me/5521994568096?text=' + encodeURIComponent(message);
}
window.addEventListener('hashchange', showPage);
renderGallery(); updatePause(); showPage();
