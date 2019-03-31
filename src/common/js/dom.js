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