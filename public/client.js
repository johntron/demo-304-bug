$(function() {
 
can.Model('A', {
  findOne: 'GET /test/{id}'
}, {
  init: function () {
console.log('init');
  }
});

A.findOne({id: "1"}, function () {
  console.log('done');
}).then(function () {

///setTimeout(function () {
  $.when(A.findOne({id: "1"})).then(function () {
    console.log('done2');
  });
//}, 100);
});
/*
  //$('a').on('click', function () {
    go('/test').then(function () {
      console.log('then-ed');
    });
    $.when(go('/test')).then(function () {
      console.log('then-ed');
    });
  //}, 100);

  function go(file) {
    console.log("Sending request");
    
    return $.when($.ajax({
      url: file,
      dataType: 'json',
      success: function () {
        console.log('Callback fired, got these arguments:', arguments);
      }
    }));
  }
*/
});

