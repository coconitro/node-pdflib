var lib = require('../index.js');
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