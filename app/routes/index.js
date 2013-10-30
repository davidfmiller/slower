exports.index = function(req, res){

  'use strict';



	res.locals.session = req.session;

	var types = [
    {
    'group' : 'Text',
    'types' : [
      { 'type' : 'text/plain',   'label' : 'Plain' },
      { 'type' : 'text/css',   'label' : 'CSS' },
      { 'type' : 'text/html',   'label' : 'HTML' },
      { 'type' : 'application/javascript', 'label' : 'JavaScript' },
      { 'type' : 'application/json', 'label' : 'JSON' },
      { 'type' : 'text/xml', 'label' : 'XML' },
      { 'type' : 'text/yaml', 'label' : 'YAML' }
	  ]},
	  {
	  'group' : 'Images',
	  'types' : [
      { 'type' : 'image/gif',  'label' : 'GIF' },
      { 'type' : 'image/jpeg',  'label' : 'JPEG' },
      { 'type' : 'image/png',  'label' : 'PNG' },
      { 'type' : 'image/tiff', 'label' : 'TIFF' },
      { 'type' : 'image/x-icon', 'label' : 'ICO' },
    ]},
	  {
	  'group' : 'Media',
	  'types' : [
	    {'type' : 'application/pdf', 'label' : 'PDF' },
	    {'type' : 'audio/ogg', 'label' : 'OGG' },
//	    {'type' : 'audio/wav', 'label' : 'WAV' },
	    {'type' : 'video/ogv', 'label' : 'OGV' },
	    {'type' : 'video/mp4', 'label' : 'MPEG4' },
	    {'type' : 'application/x-shockwave-flash', 'label' : 'SWF' }
	  ]}
	];
	
	var http = [
	  { 'code' : 200, 'label' : 'OK' },
	  { 'code' : 404, 'label' : 'Not Found' },
	];
	

  res.render('index', { mimes : types, codes : http, domain : 'localhost:8080', sleep : 1 });
};
