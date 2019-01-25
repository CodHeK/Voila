#! /usr/bin/env node

const inquirer = require('inquirer');
const values = require('../lib/values');

const questions = [
    { type: 'input', name: 'title', message: 'Choose project title' },
    { type: 'input', name: 'git', message: 'enter git repo' },
    { type: 'input', name: 'description', message: 'enter project discription' },
    { type: 'list', name: 'css', message: 'choose css', choices: values.css },
    { type: 'list', name: 'js', message: 'choose js', choices: values.js },
    { type: 'input', name: 'entry', message: 'entry point', default: 'index.html' },
    { type: 'input', name: 'author', message: 'author', default: '' },
    { type: 'input', name: 'License', message: 'License', default: 'ISC' },
];

const questions2 = [
    { type: 'confirm', name: 'final', message: 'Is this Okay?', default: true },
];

inquirer
    .prompt(questions)
    .then(function (answers) {
        console.log(answers);
        inquirer
	    .prompt(questions2)
	    .then(function (answers) {
	        console.log(answers);
})
})


