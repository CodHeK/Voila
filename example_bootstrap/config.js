const { main } = require('./components/main');
const { navbar } = require('./components/navbar');

let Main = main();
let Navbar = navbar();

exports.root = [
  {
    div: [
      {
        id: 'root',
        //ADD YOUR ELEMENTS HERE
        Navbar,
        Main
      }
    ]
  }
]
