
/*

Options:

  id - (string: defaults to 'Quickie_' + unique id) The id of the Quickie object.
  width - (number: defaults to 1) The width of the Quickie object.
  height - (number: defaults to 1) The height of the Quickie object.
  container - (element) The container into which the Quickie object will be injected.
  attributes - (object) QuickTime attributes for the element. See http://www.apple.com/quicktime/tutorials/embed.html for possible attributes.
  
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

*/

var Quickie = Class.create({
  
  initialize: function(path, options){
    var time = Try.these(
      function() { return Date.now() },
      function() { return +new Date }
    );
    var defaultOptions = {
      id: null,
      height: 1,
      width: 1,
      container: null,
      attributes: {}
    }
    this.path = path;
    this.instance = 'Quickie_' + time;
    this.options = Object.extend(defaultOptions, arguments[1] || {});
    this.id = this.options.id || this.instance;
    this.container = $(this.options.container);
    this.attributes = this.options.attributes;
    this.attributes.src = this.path;
    this.height = (this.attributes.controller == 'true') ? this.options.height + 16 : this.options.height; 
    this.width = this.options.width;
    this._assignElement();
  },
  
  toElement: function() {
    return this.element;
  },
  
  _assignElement: function() {
    var build = (Prototype.Browser.IE) ? this._buildObjectTag() : this._buildEmbedTag();
    this.element = ((this.container) ? this.container.update('') : new Element('div')).update(build).down();
  },
  
  _buildObjectTag: function() {
    var build = "";
    build = '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab"';
    build += ' id="' + this.id + '"';
    build += ' width="' + this.width + '"';
    build += ' height="' + this.height + '"';
    build += '>';
    for (var attribute in this.attributes) {
      if (this.attributes[attribute]) {
        build += '<param name="' + attribute + '" value="' + this.attributes[attribute] + '" />';
      }
    }
    build += '</object>';
    return build;
  },
  
  _buildEmbedTag: function() {
    var build = "";
    build = '<embed ';
    build += ' id="' + this.id + '"';
    build += ' width="' + this.width + '"';
    build += ' height="' + this.height + '"';
    for (attribute in this.attributes) {
      if (this.attributes[attribute]) {
        build += ' ' + attribute + '="' + this.attributes[attribute] + '"';
      }
    }
    build += ' pluginspage="http://www.apple.com/quicktime/download/"></embed>';
    return build;
  }

});


document.observe('dom:loaded', function(){
  $$('.quicktime_video').each(function(container){
    var attributes = {};
    attributes.controller = 'false';
    attributes.autoplay = 'true';
    attributes.loop = 'false';
    attributes.enablejavascript = 'false';
    container.readAttribute('rel').split('|').each(function(keyvalue) {
      pair = keyvalue.split('=');
      attributes[pair[0]] = pair[1];
    });
    var qt = new Quickie(attributes['src'], {  
      id: attributes['video_id'], 
      width: parseInt(attributes['width']), 
      height: parseInt(attributes['height']), 
      container: container, 
      attributes: attributes
    });
    container.update(qt);
  });
});

