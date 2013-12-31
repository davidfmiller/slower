exports.index = function(req, res){

  'use strict';

  var url = require('url'),
      types,
      http,
      i,
      groups,
      opt,
      query = url.parse(req.url, true).query,
      sleep = 1,
      url = query.url ? query.url : '';

  if (query.sleep) {
    sleep = parseInt(query.sleep, 10);
    if (! sleep) { sleep = 1; } 
  }

	types = [
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
	http = [
	  { 'code' : 200, 'label' : 'OK' },

	  { 'code' : 403, 'label' : 'Forbidden' },
	  { 'code' : 404, 'label' : 'Not Found' },
	  { 'code' : 410, 'label' : 'Gone' },
	  { 'code' : 404, 'label' : 'Not Found' },

	  { 'code' : 500, 'label' : 'Internal Server Error' },
	  { 'code' : 503, 'label' : 'Service Unavailable' }
	];

	for (i in types) {
	  for (groups in types[i]) {
	    for (opt in types[i].types) {
	      types[i].types[opt].id = 'rmr-slow-opt-' + types[i].types[opt].type.replace(/[\/\+]/g, '-');
	      types[i].types[opt].selected = types[i].types[opt].type == query.mime;
	    }
	  }
	}

	for (i in http) {
	  http[i].selected = http[i].code == query.status;
	}

  res.render('index', { 'mimes' : types, 'codes' : http, 'domain' : 'localhost:8080', 'sleep' : sleep, 'url' : url });
};
