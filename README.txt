
Options:

  id - (string: defaults to 'Quickie_' + unique id) The id of the Quickie object.
  width - (number: defaults to 1) The width of the Quickie object.
  height - (number: defaults to 1) The height of the Quickie object.
  container - (element) The container into which the Quickie object will be injected.
  attributes - (object) QuickTime attributes for the element. See http://is.gd/72NaE for possible attributes.
  
Returns:
  
  - (element) A new HTML object Element with browser appropriate QuickTime embed code.

Example:

var myQuickie = new Quickie('myMovie.mov', {
  id: 'myQuicktimeMovie',
  width: 640,
  height: 480,
  container: 'qtmovie',
  attributes: {
    controller: 'true',
    autoplay: 'false'
  }
});

Credits:
	
	Mootools Implementaiton: http://pradador.com/code/quickiejs/
	
License:
	
	MIT-Style License
