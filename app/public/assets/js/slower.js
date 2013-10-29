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

        Y.one('form .submit input').on('click', function(e) {
          var f = e.target.ancestor('form'),
              dest = Y.one('#rmr-slow-result');

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