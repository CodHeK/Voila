const colors = require('colors');
const { types } = require('./values');

// export function to list coffee
module.exports = function() {
    console.log('COFFEE MENU');
    console.log('------------------');

    // list on separate lines
    types.forEach((type) => {
        console.log('%s %s', colors.bold(type.name), colors.grey('/ '+ type.price));
    });
};
