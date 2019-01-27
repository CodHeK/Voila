const { nav } = require('./components/navbar');
const { main } = require('./components/main');

let Nav = nav();
let Main = main();

exports.root = [
  {
    div: [
      {
        id: 'root',
        Nav,
        Main
      }
    ]
  }
]
