exports.index = function(req, res){

  'use strict';

	res.locals.session = req.session;

	var types = [
    {
    'group' : 'Text',
    'types' : [
      { 'type' : 'text/plain', 'label' : 'Plain Text' },
      { 'type' : 'text/css', 'label' : 'CSS' },
      { 'type' : 'text/html', 'label' : 'HTML' },
      { 'type' : 'application/javascript', 'label' : 'JavaScript' },
      { 'type' : 'application/json', 'label' : 'JSON' },
      { 'type' : 'text/xml', 'label' : 'XML' },
      { 'type' : 'text/yaml', 'label' : 'YAML' }
	  ]},
	  {
	  'group' : 'Images',
	  'types' : [
      { 'type' : 'image/gif', 'label' : 'GIF' },
      { 'type' : 'image/jpeg', 'label' : 'JPEG' },
      { 'type' : 'image/png', 'label' : 'PNG' },
      { 'type' : 'image/tiff', 'label' : 'TIFF' },
      { 'type' : 'image/x-icon', 'label' : 'ICO' },
      { 'type' : 'image/svg+xml', 'label' : 'SVG' }
    ]},
	  {
	  'group' : 'Media',
	  'types' : [
	    {'type' : 'application/pdf', 'label' : 'PDF' },
	    {'type' : 'audio/ogg', 'label' : 'OGG' },
	    {'type' : 'audio/wav', 'label' : 'WAV' },
	    {'type' : 'video/ogv', 'label' : 'OGV' },
	    {'type' : 'video/mp4', 'label' : 'MPEG4' },
	    {'type' : 'video/webm', 'label' : 'WebM' },
	    {'type' : 'application/x-shockwave-flash', 'label' : 'SWF' }
	  ]}
	];

	// http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
	var http = [
	  { 'code' : 200, 'label' : 'OK' },

	  { 'code' : 403, 'label' : 'Forbidden' },
	  { 'code' : 404, 'label' : 'Not Found' },
	  { 'code' : 410, 'label' : 'Gone' },
	  { 'code' : 404, 'label' : 'Not Found' },

	  { 'code' : 500, 'label' : 'Internal Server Error' },
	  { 'code' : 503, 'label' : 'Service Unavailable' }
	];

	for (var i in types) {
	  for (var groups in types[i]) {
	    for (var opt in types[i].types) {
	      
	      console.log(types[i].types[opt].type);
	      types[i].types[opt].id = 'rmr-slow-opt-' + types[i].types[opt].type.replace(/[\/\+]/g, '-');
	    }
	  }
	}
	

  res.render('index', { mimes : types, codes : http, domain : 'localhost:8080', sleep : 1 });
};
