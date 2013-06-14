# XWiki Tools Example

This example makes a small package with one XWiki document in it.
To learn about how it is built, look at `make.js`
`https://github.com/cjdelisle/xwiki-tools-example/blob/master/src/make.js`

To run it, make sure node.js and xwiki-tools are installed:

    npm install -g xwiki-tools

Then run `./do` and observe the output.

To automatically install the resulting `.xar` file to a wiki, use

    ./do --post Admin:admin@192.168.1.1:8080/xwiki/bin/preview//

The URL contains `<username>:<password>@<host>/xwiki/bin/preview//`, it uses
preview to inject code into the wiki which imports it's package.

To generate an Apache Maven compatible project, use `./do --mvn` and a directory
will be created called `mvnout` which will contain a maven project ready to build.
