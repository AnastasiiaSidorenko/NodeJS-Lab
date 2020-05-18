const converters = require('./converters');
const meow = require('meow')(`
 Options
  --name, -n Set file name in otput folder
  --file, -f Choose file in input folder
  --length, -l Limit text length
  --help, -h Help

  Example
   $ node index.js --help
   $ node index.js --file index --name foo
   $ node index.js --length 4 -- foobar
`, {
    flags: {
        help: {
            type: 'boolean',
            alias: 'h'
        }
    }
});

const argv = require('minimist')(process.argv.slice(2), {
    alias: {
        n: 'name',
        f: 'file',
        l: 'length',
        h: 'help'
    },
    '--': true,
    unknown: (arg) => {
        console.error('Unknown option:', arg);
        meow.showHelp();
        return false;
    }
});

if (argv.length) {
    console.log(converters.convertString(argv['--'][0], argv.length));
} else if (argv.name && argv.file) {
    converters.convertCSVToJSON(argv.file, argv.name);
} else {
    console.error(`There aren't any params, choose one of:`);
    meow.showHelp();
}
