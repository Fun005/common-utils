/** Cookie工具 **/

/**
 * @name 读取Cookie
 */
function getCookie() {
  const cookies = document.cookie;
  return cookies ? cookies.split("; ").reduce((t, v) => {
    const cookie = v.split("=");
    t[cookie[0]] = cookie[1];
    return t;
  }, {}) : {};
}

/**
 * @name 删除Cookie
 * @param {string} [key=""] 键
 */
function removeCookie(key = "") {
  setCookie(key, "", -1);
}

/**
 * @name 设置Cookie
 * @param {string} [key=""] 键
 * @param {string} [val=""] 值
 * @param {number} [day=1] 过期时间(日)
 */
function setCookie(key = "", val = "", day = 1) {
  const date = new Date();
  date.setDate(date.getDate() + day);
  document.cookie = `${key}=${val};expires=${date}`;
}

/**
 * 清除所有cookie
 */
function clearAllCookie() {
  let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (let i = keys.length; i--;)
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
  }
}

export {
  getCookie,
  removeCookie,
  setCookie,
  clearAllCookie,
};

export default {
  getCookie,
  removeCookie,
  setCookie,
  clearAllCookie
};
