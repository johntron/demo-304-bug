function get(callback) {
  callback = callback || function () {}
  
  var r = new XMLHttpRequest();

  r.open("GET", "/test", true);
  r.onreadystatechange = function () {
  	if (r.readyState != 4) {
  	  return;
  	}
  	
  	if (["200", "304"].indexOf(r.status) >= 0) {
  	  return console.error(r); 
  	}
  	
  	console.log(r.responseText);
  	callback();
  };
  r.send();
}

get(get);