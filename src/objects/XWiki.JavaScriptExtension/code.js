;(function() {
  var e = document.getElementById('xwiki-tools-example-div');
  if (!e) { return; }
  require(['jquery'], function($) {
    $(e).append('<p>Hello from the XWiki Javascript Extension made with xwiki-tools!</p>');
  });
})();
