let hummus = require('hummus'),
    PDFDigitalForm = require('./pdf-digital-form'),
    fs = require('fs'),
    path = require('path');

pdfFormFieldsToJson('pdfForms');

/***
 * Retrieves all fields from pdf files in the given folder
 * saves each individual pdf to two jsons: one containing all object descriptions, and one with only field names.
 * @param dirname - string
 */
function pdfFormFieldsToJson(dirname) {
    fs.readdir(__dirname + '/' + dirname + '/', function (err, files) {
        files.forEach(function (file) {
            if (path.extname(file).toLowerCase() == '.pdf') {
                let noExt = path.basename(file, path.extname(file)),
                    pdfParser = hummus.createReader(__dirname + dirname + file),
                    digitalForm = new PDFDigitalForm(pdfParser);
                if (digitalForm.hasForm()) {
                    fs.writeFile(__dirname + '/retrievedFields/' + noExt + '.json',
                        JSON.stringify(digitalForm.fields, null, 2), {encoding: 'utf8'}, () => {});
                    fs.writeFile(__dirname + '/retrievedFields/' + noExt + '-short.json',
                        JSON.stringify(digitalForm.createSimpleKeyValue(), null, 2), {encoding: 'utf8'}, () => {});
                }
            }
        });
    });
}