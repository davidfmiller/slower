YUI.add('slower', function(Y) {

  'use strict';


  var LOADING_CLASS = 'loading';


  function SlowBase() {
    SlowBase.superclass.constructor.apply(this, arguments);
  }

  Y.Slower = Y.extend(SlowBase, Y.Base, {

      initializer : function(config) {

        Y.one('a.marklet').on('click', function(e) {
          e.halt();
          alert(e.target.get('title'));
        });
  
        Y.all('form input, form select').on('change', function(e) {
          e.target.ancestor('form').removeClass(LOADING_CLASS);
        });

        Y.all('form input, form select').on('focus', function(e) {
          e.target.ancestor('form').removeClass(LOADING_CLASS);
        });

        if (! document.body.addEventListener) { return; } // todo move to yui key event
        document.body.addEventListener('keypress', function(e) {
          var code = e.keyCode,
              li = null,
              opt = '#rmr-slow-opt-';

            Y.log(code);

          if (code >= 48 && code <= 57) {

            Y.one('#rmr-slow-sleep').set('value', code == 48 ? 0 : code - 48);

          } else if (code == 13) {

            Y.one('form .submit input')._node.click();

          } else {

            switch (code) {
              case 112: // p
                opt += 'image-png';
                break;

              case 99:  // c
                opt += 'text-css';
                break;

              case 103: // g
                opt += 'image-gif';
                break;

              case 104: // h
                opt += 'text-html';
                break;

              case 105: // i
                opt += 'image-x-icon';
                break;

              case 106: // j
                opt += 'application-javascript';
                break;

              case 109: // m
                opt += 'video-mp4';
                break;

              case 115: // s
                opt += 'image-svg-xml';
                break;

              case 116: // t
                opt += 'text-plain';
                break;

              case 119: // w
                opt += 'audio-wav';
                break;

              case 120: // x
                opt += 'text-xml';
                break;

              case 121: // y
                opt += 'text-yaml';
                break;

              default:
                opt = null;
            }

            if (opt) {
              Y.one(opt).set('selected', true);
            }
          }
          
        });


        Y.one('form .submit input').on('click', function(e) {
          var f = e.target.ancestor('form'),
              dest = Y.one('#rmr-slow-result');

//          Y.one('#rmr-slow-result').set('value', 'adsf');

          f.addClass(LOADING_CLASS); //._node.submit();
          
//          e.halt();
//          dest.set('value', 'hi');

//          dest.focus();

//          rmr-slow-result
        });

//        Y.one('form').removeClass(LOADING_CLASS);
      }
    },
    {
      NAME : 'slower',
      ATTRS : { }
    }
  );
  }, '', { 'requires' : [ 'base', 'event', 'node' ] }
);