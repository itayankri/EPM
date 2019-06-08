let hummus = require('hummus'),
    fillForm = require('./pdf-form-fill').fillForm,
    PDFDigitalForm = require('./pdf-digital-form'),
    fs = require('fs');
    path = require('path');

//fillPdfForm('healthForm', {"Middle name":'a', "Languages spoken":'c', "Name of Participant":'b'});

/***
 * Fill a PDF form with a given data.
 * @param formName - string, camelCase name without extension
 * @param dataToFill - json object, the data to fill in the form.
 *                   Note that the object's fields names must match the form's fields names.
 *                   field names can be found in the ./formFieldsToUse folder,
 *                   or be generated by fieldRetriever.js
 * @returns {string|*} - the filled file path - ./filledForms/fileName_Filled.pdf
 */
function fillPdfForm(formName, dataToFill) {
    let fields = getFormFields(formName);
    let data = [];

    for (let field in fields) {
        data[field] = dataToFill[field];
    }

    let now = new Date(Date.now());

    /** Use this only on development!!!!! (when using localhost:4100) */
    // let modifiedFilePath = path.resolve(__dirname,'../static/pdfs/filledForms/',now.getFullYear().toString() +
    //                                     (now.getMonth()+1).toString().padStart(2, '0') + now.getDate().toString().padStart(2, '0') + "-" +
    //                                     data["First name"] + "_" + data["Last name"] + "_" + formName + '_' + "Filled.pdf");

    /** Use this on production!!!!! (when using localhost:8000) */
    let modifiedFilePath = path.resolve(__dirname,'../../client/build/static/pdfs/filledForms/',now.getFullYear().toString() +
        (now.getMonth()+1).toString().padStart(2, '0') + now.getDate().toString().padStart(2, '0') + "-" +
        data["First name"] + "_" + data["Last name"] + "_" + formName + '_' + "Filled.pdf");

    console.log('destination path', modifiedFilePath);

    fs.copyFile(path.resolve(__dirname,'../static/pdfs/filledForms/healthForm.pdf'), modifiedFilePath, (err) => {
        console.log(err);
        if (err) throw err;
    });

    let writer = hummus.createWriterToModify(__dirname + '/pdfForms/' + formName + '.pdf', {
        modifiedFilePath: modifiedFilePath
    });

    fillForm(writer,data, {
        defaultTextOptions: {
            font: writer.getFontForFile(__dirname + '/fonts/courierb.ttf'),
            size: 10,
            colorspace: 'gray',
            color: 0,
        },
        debug:false
    });
    writer.end();

    return modifiedFilePath;
}

/***
 * Get all fields from a given PDF form.
 * @param formName - string, camelCase name without extension
 * @returns {{}} - An object containing all form fields.
 */
function getFormFields(formName) {
    let pdfParser = hummus.createReader(__dirname + '/pdfForms/' + formName + '.pdf'),
        digitalForm = new PDFDigitalForm(pdfParser);

    if(digitalForm.hasForm()) {
        return digitalForm.createSimpleKeyValue();
    }
}

module.exports = {
    fillPdfForm:fillPdfForm,
    getFormFields:getFormFields
};