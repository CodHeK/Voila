#! /usr/bin/env node

const program = require('commander');

// import function to list coffee menu
const list = require('../lib/init');

/*******************************************/

program
    .command('init') // sub-command name
    .alias('ls') // alternative sub-command is `al`
    .description('List coffee menu') // command description

    // function to execute when command is uses
    .action(function () {
        list();
    });


// allow commander to parse `process.argv`
program.parse(process.argv);
