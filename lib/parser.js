var fs = require('fs');

let attrbs = [ 'id', 'class', 'href', 'src', 'width', 'height', 'style',
               'value', 'type', 'placeholder', 'title', 'alt', 'disabled', 'name' ];


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
        for(var i=0;i<root[key].length;i++)
          html += parse(key,root[key][i]);
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
  var bodystart, bodyend;
  var data = fs.readFileSync(`${dir}/index.html`).toString().split("\n");
  for (var i=0; i<data.length; i++) {
    if (data[i].trim() === '<body>') {
      bodystart = i;
    } else if (data[i].trim() === '</body>') {
      bodyend = i;
    }
  }
  data.splice(bodystart+1, bodyend-bodystart-1);
  data.splice(bodystart+1, 0, html);
  var text = data.join("\n");
  text = text.replace('<[object Object] >', '');
  text = text.replace('</[object Object]>', '');
  fs.writeFile(`${dir}/index.html`, text, function (err) {
    if (err) return console.log(err);
  });
  console.log(html);
}
