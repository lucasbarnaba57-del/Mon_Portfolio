/* Amélioration progressive : les contenus et liens restent accessibles sans JavaScript. */
(() => {
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const list = document.getElementById(group.dataset.target);
    if (!list) return;
    const cards = [...list.querySelectorAll(':scope > [data-category]')];
    const buttons = [...group.querySelectorAll('[data-filter]')];
    const result = group.querySelector('[role="status"]');
    const apply = value => {
      let visible = 0;
      cards.forEach(card => {
        card.hidden = value !== 'all' && card.dataset.category !== value;
        if (!card.hidden) visible += 1;
      });
      buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === value)));
      const noun = group.dataset.noun || 'résultat';
      if (result) result.textContent = visible + ' ' + noun + (visible > 1 ? 's' : '') + ' affichée' + (visible > 1 ? 's' : '');
    };
    buttons.forEach(button => button.addEventListener('click', () => apply(button.dataset.filter)));
    group.hidden = false;
    apply('all');
  });
  document.querySelectorAll('[data-print]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => window.print());
  });
  // Imprimer aussi les cartes masquées par un filtre ; restaurer l’état après impression.
  let hiddenCards = [];
  let closedDetails = [];
  window.addEventListener('beforeprint', () => {
    hiddenCards = [...document.querySelectorAll('[data-category][hidden]')];
    hiddenCards.forEach(card => { card.hidden = false; });
    closedDetails = [...document.querySelectorAll('details:not([open])')];
    closedDetails.forEach(detail => { detail.open = true; });
  });
  window.addEventListener('afterprint', () => {
    hiddenCards.forEach(card => { card.hidden = true; });
    hiddenCards = [];
    closedDetails.forEach(detail => { detail.open = false; });
    closedDetails = [];
  });
})();
