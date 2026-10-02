/* SOLO DEMO: blocca l'invio del modulo preventivo e mostra un messaggio.
   Il browser controlla prima che i campi obbligatori siano compilati. */
(function () {
  var modulo = document.getElementById('modulo-demo');
  var messaggio = document.getElementById('messaggio-demo');
  if (!modulo || !messaggio) return;
  modulo.addEventListener('submit', function (evento) {
    evento.preventDefault();
    messaggio.textContent = 'Questo è un sito dimostrativo: il modulo non invia messaggi.';
  });
})();
