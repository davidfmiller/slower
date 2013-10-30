/**
 * Module dependencies.
 */

var template_engine = 'dust',
    domain = 'localhost';

var express = require('express'),
    engine = require('ejs-locals'),
    routes = require('./routes'),
    http = require('http'),
    store = new express.session.MemoryStore,
    path = require('path'),
    request = require('request'),
    fs = require('fs'),
    url = require('url');

var app = express();

var dust = require('dustjs-linkedin'),
    cons = require('consolidate');

app.engine('dust', cons.dust);

app.configure(function(){

  app.set('template_engine', template_engine);
  app.set('domain', domain);
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', template_engine);
  app.use(express.favicon(__dirname + '/public/assets/img/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('wigglybits'));
  app.use(express.session({ secret: 'whatever', store: store }));
  app.use(express.session());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));

  app.disable('x-powered-by');

  app.use(function(req, res, next){
/*
    if (req.session.user) {
      req.session.logged_in = true;
    }
//    res.locals.message = req.flash();
    res.locals.session = req.session;
    res.locals.q = req.body;
    res.locals.err = false; 
*/
    next();
  });
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.locals.inspect = require('util').inspect;
app.get('/', routes.index);


app.get('/slower', function(req, res) {

  var parsed = url.parse(req.url, true),
      query = parsed.query,
      canned = query.mime ? query.mime : 'text/plain',
      status = (query.status ? query.status : null),
      sleep = parseInt(query.sleep ? query.sleep : 0, 10) * 1000,
      target = query.url;

  if (! status) { 
    status = 200;
  }

  if (target) {

    target = (target.substring(0, 7) == 'http://' ? '' : 'http://') + target;

    console.log('slowing ' + target);

    setTimeout( function() { 
      request( { 'url' : target, 'headers' : { 'User-Agent' : 'slower/1.0' }  }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          res.writeHead('200', {'Content-Type' : response.headers['content-type'], 'Cache-Control' : 'no-cache, must-revalidate' });
          res.end(body);
        } else {
          res.writeHead(500, { 'Content-Type' : 'text/html' });
          res.end('oops');
        }
      });
    }, sleep);

  } else {

    var f = __dirname + '/public/canned/' + canned.replace('/', '.');
    console.log('reading ' + f);

    setTimeout( function() { 
      fs.readFile(f, function(err, data) {
        if (! err) {
          res.writeHead(status, { 'Content-Type' : canned, 'Cache-Control' : 'no-cache, must-revalidate' });
          res.end(data);
        } else {
          res.writeHead(500, { 'Content-Type' : 'text/html' });
          res.end('oops');
        }
      });
    }, sleep);
  }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});