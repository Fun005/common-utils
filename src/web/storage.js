/** Storage工具 **/

/**
 * @name 设置localStorage
 * @param {string} [key=""] 键
 * @param {string} [val=""] 值
 */
export function setLocalStorage(key = "", val = "") {
	localStorage.setItem(key, JSON.stringify(val));
}

/**
 * @name 读取localStorage
 * @param {string} [key=""] 键
 */
export function getLocalStorage(key = "") {
	return JSON.parse(localStorage.getItem(key));
}

/**
 * @name 移除localStorage
 * @param {string} [key=""] 键
 */
export function removeLocalStorage(key = "") {
	localStorage.removeItem(key);
}

/**
 * @name 清空localStorage
 */
export function clearLocalStorage() {
	localStorage.clear();
}


/**
 * @name 设置sessionStorage
 * @param {string} [key=""] 键
 * @param {string} [val=""] 值
 */
export function setSessionStorage(key = "", val = "") {
	sessionStorage.setItem(key, JSON.stringify(val));
}

/**
 * @name 读取sessionStorage
 * @param {string} [key=""] 键
 */
export function getSessionStorage(key = "") {
	return JSON.parse(sessionStorage.getItem(key));
}

/**
 * @name 移除sessionStorage
 * @param {string} [key=""] 键
 */
export function removeSessionStorage(key = "") {
	sessionStorage.removeItem(key);
}

/**
 * @name 清空sessionStorage
 */
export function clearSessionStorage() {
	sessionStorage.clear();
}

