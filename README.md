# node-pdflib

This is a ffi wrapper for pdflib (http://pdflib.com) for use with node.js. 

## Installation

 * PDFlib installed for your platform (http://www.pdflib.com/download/pdflib-family/pdflib-9/)
 * A dylib version of PDFlib (see notes) 

### Dylib

The static lib needs to be converted to a dylib.

#### OS X

```
g++ -fpic -shared -framework Carbon -Wl,-all_load libpdf.a -Wl -framework Carbon -o libpdf.dylib
```

#### Linux

```
g++ -fpic -shared -Wl,-all_load libpdf.a -Wl -o libpdf.dylib
```

## Usage

### Example

```
var lib = require('pdflib');
var pdflib = lib.pdflib;
var PDFLIB = lib.DEFINES;

var pdf = pdflib.PDF_new();
pdflib.PDF_set_option(pdf, "errorpolicy=return");
if (pdflib.PDF_begin_document(pdf, "hello.pdf", 0, "") == -1) {
  console.log("Error: "+pdflib.PDF_get_errmsg(pdf));
  return(2);
}
```

### Async

All functions in the library have an equivalent async version. To call it append .async() and the last parameter is the callback. `callback(error, result)`

```
pdflib.PDF_begin_document.async(pdf, "hello.pdf", 0, "", function(err, res) {
  if (err) {
    throw err;
  }
  console.log(res);
});
```