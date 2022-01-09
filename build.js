const shell = require('shelljs');

shell.rm('-rf', './build');

shell.exec('tsc');

shell.cp('-rf', './src/typings', './types');
