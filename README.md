# Node Pdflib

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
g++ -fpic -shared -Wl,-whole-archive libpdf.a -Wl,-no-whole-archive -o libpdf.so
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

// Set some options
pdflib.PDF_set_option(pdf, "hypertextencoding=host");
pdflib.PDF_set_info(pdf, "Creator", "hello.c");
pdflib.PDF_set_info(pdf, "Author", "Foo bar");
pdflib.PDF_set_info(pdf, "Title", "Hello, world (C)!");
pdflib.PDF_begin_page_ext(pdf, PDFLIB.a4_width, PDFLIB.a4_height, "");

// Write something
var font = pdflib.PDF_load_font(pdf, "Helvetica-Bold", 0, "host", "");
if (font == -1) {
  console.log("Error: "+pdflib.PDF_get_errmsg(pdf));
  pdflib.PDF_delete(pdf);
  return(2);
}

pdflib.PDF_setfont(pdf, font, 24);
pdflib.PDF_set_text_pos(pdf, 50, 700);
pdflib.PDF_show(pdf, "Hello, world! MADE IN NODE");
pdflib.PDF_continue_text(pdf, "(says C)");
pdflib.PDF_end_page_ext(pdf, "");
pdflib.PDF_end_document(pdf, "");
pdflib.PDF_delete(pdf);
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
