/** 函数工具 **/

/**
 * @name 格式异步返回值
 * @param {function} [fn=Promise.resolve(true)] Promise函数
 */
function asyncTo (fn = Promise.resolve(true)) {
  return fn && fn instanceof Promise ? fn.then(data => [null, data]).catch(err => [err]) : [null, null];
}

/**
 * @name 防抖
 * @param {function} [fn] 函数
 * @param {number} [dura=500] 时延
 */
function debounce (fn, delay = 500) {
  let timer = null;
  return function (...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * @name 节流
 * @param {function} [fn] 函数
 * @param {number} [dura=500] 时延
 */
function throttle (fn, delay = 500) {
  let pass = 0;
  return function (...args) {
    const now = +new Date();
    if (now - pass > delay) {
      pass = now;
      fn.apply(this, args);
    }
  };
}

/**
 * @name 等待
 * @param {number} [wait=1000] 时延
 */
async function waitFor (wait = 1000) {
  return new Promise(resolve => setTimeout(() => resolve(true), wait));
}

export {
  asyncTo,
  debounce,
  throttle,
  waitFor
};