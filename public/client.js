$(function() {
  log('Sending GET request ...');
  $.get('/test', function () {
    log('done (first callback)');
    log('Sending second GET (304) ...');
    
    $.when(
      // Inner .then()
      $.get('/test', function () {
        log('done (second callback)');
      }).then(function () {
        log('done (inner .then()')
      })
    // Outer .then()
    ).then(function () {
      log('done (outer .then)');
    });
  });
});