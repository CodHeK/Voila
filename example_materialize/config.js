const { nav } = require('./components/navbar');

let Nav = nav();

exports.root = [
  {
    div: [
      {
        id: 'root',
        Nav
      }
    ]
  }
]
