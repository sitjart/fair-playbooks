/* Flashcard reveal + local self-assessment — lifted from Flashcard.astro. */
document.querySelectorAll('.flashcard').forEach(function (card) {
  var reveal = card.querySelector('.flashcard-reveal');
  if (reveal) reveal.addEventListener('click', function () { card.setAttribute('data-revealed', 'true'); });

  card.querySelectorAll('.flashcard-feedback button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      card.querySelectorAll('.flashcard-feedback button').forEach(function (b) { b.removeAttribute('data-state'); });
      btn.setAttribute('data-state', 'active');
      var feedback = btn.getAttribute('data-feedback');
      var q = card.querySelector('.flashcard-question');
      var key = 'flashcard-' + ((q && q.textContent) || '').slice(0, 40);
      try { localStorage.setItem(key, feedback || ''); } catch (e) {}
    });
  });
});
