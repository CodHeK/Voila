const colors = require('colors');
const Table = require('cli-table');
const chalk = require('chalk');
const emojic = require("emojic"), colorIt = require("color-it");
const { stt } = require('../voice_module/stt');

module.exports.server = function() {
  const express = require('express');
  const app = express();
  var path = require('path');
  const fp = require("find-free-port");
  let port;
  fp(9000, 9999, function(err, freePort) {
    port = freePort;
  });
  app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname + '/index.html'))
  });

  const table = new Table({ chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' } });

  setTimeout(function() {
    setTimeout(function() {
      console.log("You're all set to build something awesome using %s", chalk.magenta.bgBlack.bold(` VOILA `));
      table.push(
        [colors.green('Serving!'), ' '],
        [' ' , ' '],
        [chalk.black.bold('- Local '), `http://localhost:${port}`]
      );
      console.log(table.toString());
      console.log(`Move to the above URL to ` + chalk.black.bold('voice build') + ` your HTML/CSS! ` + colorIt(emojic.smiley).green());
      console.log(' ');
      console.log(' ');
      console.log(chalk.white.bgBlack.bold('LISTENING TO YOUR COMMANDS....'));
      stt();
    }, 1000);
    app.listen(port);
  }, 1000);
}
