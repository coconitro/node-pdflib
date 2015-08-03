var pdflib = require('../index.js').pdflib;

console.log("Loaded PDFLib version: "+pdflib.PDF_get_majorversion()+"."+pdflib.PDF_get_minorversion());
console.log("PDFLib API:");
console.log(pdflib);