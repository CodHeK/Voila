#! /usr/bin/env node

const program = require('commander');
const { server } = require('../lib/server');
const inquirer = require('inquirer');
const values = require('../lib/values');
const fs = require('fs');
const { exec } = require('child_process');
const  cdn = require('../lib/res/cdn');
const { parser } = require('../lib/parser');

const questions = [
    { type: 'input', name: 'title', message: 'Choose project title' },
    { type: 'input', name: 'description', message: 'Enter project discription' },
    { type: 'list', name: 'css', message: 'Choose css', choices: values.css },
    { type: 'input', name: 'entry', message: 'Entry point', default: 'index.html' },
    { type: 'input', name: 'author', message: 'Author', default: '' },
    { type: 'input', name: 'License', message: 'License', default: 'ISC' },
    { type: 'confirm', name: 'git', message: 'Do you want it to be a git repo?', default: true }
];

const questions2 = [
    { type: 'checkbox', name: 'gitignore', message: 'Which files you want to be ignored by git', choices: values.gitignore }
];

const questions3 = [
    { type: 'confirm', name: 'final', message: 'Is this Okay?', default: true },
];

let thisDir;

function setHTML(dir) {
  let css = (l3.css === 'Bootstrap') ? (cdn.bootstrap['css'][0]) : (cdn.materialize['css'][0]);
  let js = (l3.css === 'Bootstrap') ? (cdn.bootstrap['js']) : (cdn.materialize['js']);

  let js_files = ``, thisDir = dir;

  for(var i = 0; i < js.length; i++) {
      js_files += (js[i]+'\n');
  }

  let html = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>${l3.title}</title>
        ${css}
        ${js_files}
      </head>
      <body>
        <h1>hey</h1>
      </body>
    </html>
  `;

  fs.appendFile(`${dir}/${l3.entry}`, `${html}\n`, function (err) {
      if (err) throw err;
  });
}

function jsonConcat(o1, o2) {
 for (var key in o2) {
  o1[key] = o2[key];
 }
 return o1;
}

var l1,l2 = {},l3;

function init() {
  inquirer
      .prompt(questions)
      .then(async function (answers) {
          l1 = answers;
          if(answers.git==true) {
              inquirer
              .prompt(questions2)
              .then(async function (answers2) {
                  l2 = answers2;
                  l3 = jsonConcat(l1, l2);
                  l3 = jsonConcat(l3, {
                    "config": "config.js"
                  });
                  console.log(l3);
                  inquirer
                  .prompt(questions3)
                  .then(async function (answers3) {
                      if (answers3.final === true) {
                          var curr_dir = process.cwd();
                          var dir = `${curr_dir}/${answers.title}`;
                          /* Creating a directory */
                          try {
                              fs.mkdirSync(dir);
                              console.log(`Created folder ${answers.title}. You can do cd ${answers.title} to view the files created.`)
                          } catch (err) {
                              if (err.code !== 'EEXIST') throw err
                          }
                          /* Initialize a empty git repo */
                          if (answers.git === true) {
                              await exec(`cd ${dir} && git init`, (err, stdout, stderr) => {
                                  if (err) {
                                    console.log('Could not create a empty git repo.')
                                    return;
                                  }
                                  console.log(stdout);
                              });
                          }
                          /* Make empty css and js folders */
                          try {
                              fs.mkdirSync(`${dir}/js`);
                              fs.mkdirSync(`${dir}/css`);
                          } catch (err) {
                              if (err.code !== 'EEXIST') throw err
                          }
                          /* Make entry point file */
                          fs.open(`${dir}/${answers.entry}`,'w', function(err, file) {
                              if (err) {
                                  console.log('Error creating entry point');
                              } else {
                                  console.log('File created successfully');
                              }
                          });

                          fs.open(`${dir}/${answers.entry}`,'w', function(err, file) {
                              if (err) {
                                  console.log('Error creating entry point');
                              } else {
                                  console.log('File created successfully');
                              }
                          });

                          fs.open(`${dir}/voila.json`,'w', function(err, file) {
                              if (err) {
                                  console.log('Error creating entry point');
                              } else {
                                  console.log('File created successfully');
                              }
                          });
                          fs.writeFile (`${dir}/voila.json`, JSON.stringify(l3), function(err) {
                              if (err) throw err;
                              console.log('complete');
                              }
                          );

                          /* Make .gitignore */
                          fs.open(`${dir}/.gitignore`,'w', function(err, file) {
                              if (err) {
                                  console.log('Error creating .gitignore');
                              } else {
                                  var data = answers.gitignore;
                                  for (var i=0; i<data.length; i++) {
                                      fs.appendFile(`${dir}/.gitignore`, `${data[i]}\n`, function (err) {
                                          if (err) throw err;
                                      });
                                  }
                                  console.log('Successfully created .gitignore');
                              }
                          });

                          fs.open(`${dir}/config.js`,'w', function(err, file) {
                              if (err) {
                                  console.log('Error creating config.js');
                              } else {
                                  let root = `
                                      exports.root = {
                                        div: {
                                          id: 'root',
                                          //ADD YOUR ELEMENTS HERE
                                        }
                                      }
                                  `;
                                  root = root.trim();
                                  fs.appendFile(`${dir}/config.js`, `${root}\n`, function (err) {
                                      if (err) throw err;
                                  });
                                  console.log('Successfully created .gitignore');
                              }
                          });
                          setHTML(dir);
                      }
                  })
                  .catch((error) => {
                      console.log(error);
                  })

              })
          }
          else {
              l3 = jsonConcat(l1, l2);
              l3 = jsonConcat(l3, {
                "config": "config.js"
              });
              console.log(l3);
              inquirer
              .prompt(questions3)
              .then(async function (answers3) {
                  if (answers3.final === true) {
                      var curr_dir = process.cwd();
                      var dir = `${curr_dir}/${answers.title}`;
                      /* Creating a directory */
                      try {
                          fs.mkdirSync(dir);
                          console.log(`Created folder ${answers.title}. You can do cd ${answers.title} to view the files created.`)
                      } catch (err) {
                          if (err.code !== 'EEXIST') throw err
                      }
                      /* Initialize a empty git repo */
                      if (answers.git === true) {
                          await exec(`cd ${dir} && git init`, (err, stdout, stderr) => {
                              if (err) {
                                console.log('Could not create a empty git repo.')
                                return;
                              }
                              console.log(stdout);
                          });
                      }
                      /* Make empty css and js folders */
                      try {
                          fs.mkdirSync(`${dir}/js`);
                          fs.mkdirSync(`${dir}/css`);
                      } catch (err) {
                          if (err.code !== 'EEXIST') throw err
                      }
                      /* Make entry point file */
                      fs.open(`${dir}/${answers.entry}`,'w', function(err, file) {
                          if (err) {
                              console.log('Error creating entry point');
                          } else {
                              console.log('File created successfully');
                          }
                      });

                      fs.open(`${dir}/${answers.entry}`,'w', function(err, file) {
                          if (err) {
                              console.log('Error creating entry point');
                          } else {
                              console.log('File created successfully');
                          }
                      });

                      fs.open(`${dir}/voila.json`,'w', function(err, file) {
                          if (err) {
                              console.log('Error creating entry point');
                          } else {
                              console.log('File created successfully');
                          }
                      });
                      fs.writeFile (`${dir}/voila.json`, JSON.stringify(l3), function(err) {
                          if (err) throw err;
                          console.log('complete');
                          }
                      );
                      fs.open(`${dir}/config.js`,'w', function(err, file) {
                          if (err) {
                              console.log('Error creating config.js');
                          } else {
                              let root = `
                                  exports.root = {
                                    div: {
                                      id: 'root',
                                      //ADD YOUR ELEMENTS HERE
                                    }
                                  }
                              `;
                              root = root.trim();
                              fs.appendFile(`${dir}/config.js`, `${root}\n`, function (err) {
                                  if (err) throw err;
                              });
                              console.log('Successfully created .gitignore');
                          }
                      });
                      setHTML(dir);

                  }
              })
              .catch((error) => {
                  console.log(error);
              })
          }

      })
}

program
    .command('init')
    .description('Initializing')
    .action(function () {
        init();
    });

program
    .command('start')
    .description('Starting Server!')
    .action(function () {
        server();
    });

program
    .command('load')
    .description('Parsing!')
    .action(function () {
        parser();
    });


program.parse(process.argv);
