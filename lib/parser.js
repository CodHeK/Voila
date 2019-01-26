let attrbs = [ 'id', 'class', 'href', 'src', 'width', 'height', 'style', 'value' ];


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
  //console.log(root);
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
  console.log(html);
}
