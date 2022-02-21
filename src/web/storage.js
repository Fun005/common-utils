/** Storage工具 **/

/**
 * @name 清空LocalStorage
 */
function clearLStorage () {
	localStorage.clear();
}

/**
 * @name 清空SessionStorage
 */
function clearSStorage () {
	sessionStorage.clear();
}

/**
 * @name 读取LocalStorage
 * @param {string} [key=""] 键
 */
function getLStorage (key = "") {
	return JSON.parse(localStorage.getItem(key));
}

/**
 * @name 读取SessionStorage
 * @param {string} [key=""] 键
 */
function getSStorage (key = "") {
	return JSON.parse(sessionStorage.getItem(key));
}

/**
 * @name 移除LocalStorage
 * @param {string} [key=""] 键
 */
function removeLStorage (key = "") {
	localStorage.removeItem(key);
}

/**
 * @name 移除SessionStorage
 * @param {string} [key=""] 键
 */
function removeSStorage (key = "") {
	sessionStorage.removeItem(key);
}

/**
 * @name 设置LocalStorage
 * @param {string} [key=""] 键
 * @param {string} [val=""] 值
 */
function setLStorage (key = "", val = "") {
	localStorage.setItem(key, JSON.stringify(val));
}

/**
 * @name 设置SessionStorage
 * @param {string} [key=""] 键
 * @param {string} [val=""] 值
 */
function setSStorage (key = "", val = "") {
	sessionStorage.setItem(key, JSON.stringify(val));
}

export {
	clearLStorage,
	clearSStorage,
	getLStorage,
	getSStorage,
	removeLStorage,
	removeSStorage,
	setLStorage,
	setSStorage
};