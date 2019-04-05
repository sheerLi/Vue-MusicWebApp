// 新增类名
export function addClass(el,cname){
  if(hasClass(el,cname)){
    return
  }
  // console.log('ok');
  let newClass = el.className.split(' ');
  newClass.push(cname);
  el.className = newClass.join(' ');
}

// 判断是否存在类名
function hasClass(el,cname){
  var reg = new RegExp('(^|\\s)'+cname+'(\\s|$)');
  return reg.test(el.className);
}

export function getData(el, name, val){
  const prefix = 'data-'
  name = prefix + name
  if(val){
    el.setAttribute(name, val)
  }else {
    return el.getAttribute(name)
  }
}

// js 方式添加属性自动补充前缀
let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}