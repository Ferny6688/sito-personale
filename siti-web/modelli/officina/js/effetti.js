/* Effetti leggeri del sito, scritti a mano, senza librerie.
   Senza questo file il sito funziona lo stesso e mostra tutti i contenuti. */
(function () {
  var radice = document.documentElement;
  var fermo = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Testata che si riduce quando scorri */
  var testata = document.getElementById('testata');
  if (testata) {
    var aggiorna = function () { testata.classList.toggle('ridotta', window.scrollY > 40); };
    aggiorna();
    window.addEventListener('scroll', aggiorna, { passive: true });
  }

  /* 2. Menu mobile: senza JS si apre con #menu-mobile (CSS :target);
        con JS si apre senza cambiare l'indirizzo e si chiude anche con il tasto Esc */
  var pannello = document.getElementById('menu-mobile');
  var apri = document.querySelector('.apri-menu');
  if (pannello && apri) {
    var chiudi = function () {
      pannello.classList.remove('aperto');
      apri.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    apri.addEventListener('click', function (e) {
      e.preventDefault();
      pannello.classList.add('aperto');
      apri.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      var primo = pannello.querySelector('ol a');
      if (primo) primo.focus();
    });
    pannello.querySelector('.chiudi').addEventListener('click', function (e) {
      e.preventDefault();
      chiudi();
      apri.focus();
    });
    pannello.querySelectorAll('ol a, .logo').forEach(function (a) { a.addEventListener('click', chiudi); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') chiudi(); });
  }

  /* 3. Elementi che compaiono scorrendo (classe "rivela") */
  if (fermo || !('IntersectionObserver' in window)) return;
  radice.classList.add('js');

  var osservatore = new IntersectionObserver(function (voci) {
    voci.forEach(function (voce) {
      if (!voce.isIntersecting) return;
      var el = voce.target;
      el.classList.add('visto');
      osservatore.unobserve(el);
      // finita la comparsa tolgo il ritardo, così gli effetti al passaggio del mouse sono pronti
      setTimeout(function () { el.style.transitionDelay = ''; }, 1100);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

  document.querySelectorAll('.rivela').forEach(function (el, i) {
    el.style.transitionDelay = (i % 4) * 80 + 'ms';
    osservatore.observe(el);
  });
})();
