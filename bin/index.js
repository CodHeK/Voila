#! /usr/bin/env node

const program = require('commander');
const { server } = require('../lib/server');


program
    .command('start')
    .description('Starting Server!')
    .action(function () {
        server();
    });


program.parse(process.argv);
