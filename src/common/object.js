/** 对象工具 **/

/**
 * @name 读取属性
 * @param {*} [obj={}] 对象
 * @param {*} [keys=[]] 属性集合
 */
function getKeys(obj = {}, keys = []) {
  return Object.keys(obj).reduce((t, v) => (keys.includes(v) && (t[v] = obj[v]), t), {});
}

/**
  * @description 深层对象获取
  * @param {*} obj 传入需要获取的对象数组
  * @param {*} paths 路径，['a', 'b', 'c', 'd'] || 'a.b.c.d' || '0.a.1.b'
  * @returns 获取后的对象属性，如果没有返回undefined
*/
function getDeepObj(obj, paths) {

  if (typeof paths === 'string') {
    paths = paths.split('.');
  }

  function myReducer(arr, reducer, initVal) {
    for (let i = 0; i < arr.length; i++) {
      initVal = reducer(initVal, arr[i], i, arr);
    }
    return initVal
  }

  return myReducer(paths, (value, key) => {
    if (!value) {
      return undefined;
    }
    if (/^[0-9]+$/.test(key)) {
      key = Number(key)
    }
    return value[key];
  }, obj)
}

export {
  getKeys,
  getDeepObj,
};

export default {
  getKeys,
  getDeepObj,
};