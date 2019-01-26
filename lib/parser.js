var fs = require('fs');

let attrbs = [ 'id', 'class', 'href', 'src', 'width', 'height', 'style',
               'value', 'type', 'placeholder', 'title', 'alt', 'disabled' ];


function check(root) {
  let flag = true;
  Object.keys(root).forEach(key => {
    if(attrbs.indexOf(key) === -1) {
      flag = false;
    }
  })
  return flag;
}

function parse(el,root) {
    if(check(root)) {
      let attrs = ``, value = ``;
      Object.keys(root).forEach(key => {
        if(key !== 'value')
          attrs += `${key}="` + root[key] + `" `;
        else {
          value = root[key];
        }
      });
      return `
         <${el} ${attrs}> ${value} </${el}>
      `;
    }

    let html = ``, attrs = ``, value = ``, flag = true;
    Object.keys(root).forEach(key => {
      let val = root[key];
      if(attrbs.indexOf(key) === -1) {
        if(flag === true) {
          flag = false;
          html += `<${el} ${attrs}> ${value}`;
        }
        html += parse(key,val);
      }
      else {
        if(key === 'value') {
          value = root[key];
        }
        else {
          attrs += `${key}="` + root[key] + `" `;
        }
      }
    })


    return (html + `</${el}>`);

}

module.exports.parser = function() {
  const dir = process.cwd();
  const root = require(`${dir}/config.js`)
  html = parse(root,root);
  var lineNumber;
  var data = fs.readFileSync(`${dir}/index.html`).toString().split("\n");
  for (var i=0; i<data.length; i++) {
    if (data[i].trim() === '<body>') {
        lineNumber = i+1;
        break;
    }
  }
  console.log(lineNumber);
  data.splice(lineNumber, 0, html);
  var text = data.join("\n");

  fs.writeFile(`${dir}/index.html`, text, function (err) {
    if (err) return console.log(err);
  });
  console.log(html);
}
