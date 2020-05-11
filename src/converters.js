function convertString(str, length) {
    const string = str.substr(0, length);
    return string.split('').reverse().join('');
}

function convertCSVToJSON(input, output) {
    const csv = require('csvtojson');
    const readStream = require('fs').createReadStream(`../input/${input}.csv`);
    const writeStream = require('fs').createWriteStream(`../output/${output}.json`);
    readStream.pipe(csv()).pipe(writeStream);
    console.log('Converted sucessfully!');
}

module.exports.convertString = convertString;
module.exports.convertCSVToJSON = convertCSVToJSON;