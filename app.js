function showPage() {
  const page = location.hash === '#contatos' ? 'contatos' : 'portfolio';
  for (const section of document.querySelectorAll('main > section')) section.hidden = section.id !== page;
  for (const link of document.querySelectorAll('[data-page]')) {
    const active = link.dataset.page === page;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', showPage);
showPage();
