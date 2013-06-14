var XWiki = require('xwiki-tools');
var Fs = require('fs');

//---------------------- Create XWiki Package ----------------------//

var pack = new XWiki.Package();
pack.setName("XWiki - Contrib - XWiki Tools Example");
pack.setDescription("So easy to use, nowonder it's unheard of!");

// This is needed to register with the extension manager repository
pack.setExtensionId("org.xwiki.contrib:xwiki-tools-example");


//---------------------- Add a Document ----------------------//

var doc = new XWiki.model.XWikiDoc(["XWikiToolsExample","WebHome"]);

// Each of the fields in the document has corrisponding getters and setters.
// do because it has 'title', you can call setTitle() and getTitle()
// https://github.com/cjdelisle/xwiki-tools/blob/master/lib/model/XWikiDoc.js
doc.setTitle("An example of the power of xwiki-tools");

// You can also use contentFromFile() to host the content externally.
doc.setContent(XWiki.Tools.contentFromFile('src/XWikiToolsExample.WebHome.xwiki2'));

// addAttachment() *only* accepts files on the filesystem.
// You may place attachments and content on the system however you like but using conventions
// like /attachments/ will make collaboration easier, here we scan a directory called attachments
// and attach all files therein.
Fs.readdirSync('src/attachments').forEach(function(name) {
    doc.addAttachment('src/attachments/' + name);
});

// Lets give our document an object!
var obj = new XWiki.model.classes.JavaScriptExtension();

// The object class is described here:
// https://github.com/cjdelisle/xwiki-tools/blob/master/lib/model/classes/JavaScriptExtension.js
// As with the document, fir each field there are corrisponding setters and getters.
// The setters and getters can be chained so obj.setParse(true).setUse('always').setCache('long')
// is ok.
obj.setCode(XWiki.Tools.contentFromFile("src/objects/XWiki.JavaScriptExtension/code.js"));
obj.setParse(true);
obj.setUse('always');
obj.setCache('long');
doc.addXObject(obj);

// Add the document into the package.
pack.addDocument(doc);


//---------------------- Build the package ----------------------//

// Post to a wiki?
// must post to a /preview/ page, for example:
// syntax  ./do --post Admin:admin@192.168.1.1:8080/xwiki/bin/preview//
var i;
if ((i = process.argv.indexOf('--post')) > -1) {
    pack.postToWiki(process.argv[i+1]);

} else if ((i = process.argv.indexOf('--mvn')) > -1) {
    // ./do --mvn
    // Generate output which can be consumed by Maven to build a .xar
    pack.genMvn('mvnout');

} else {
    // default:
    // Generate an xar file.
    pack.genXar('XWikiToolsExample.xar');
}
