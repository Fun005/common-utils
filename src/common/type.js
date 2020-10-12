/**
 * @name 比较对象
 * @param {object} obj1 对象1
 * @param {object} obj2 对象
 */
function compareObj(obj1, obj2) {
	const result = {};
	const keys = Object.keys(obj1);
	keys.forEach(k => (result[k] = isEqual(obj1[k], obj2[k])));
	return result;
}

/**
 * @name 环境类型
 */
function envType() {
	return typeof window !== "undefined"
		? "web"
		: typeof global !== "undefined" ? "node" : "unknow";
}

/**
 * @name 判断环境
 */
function isWeb() {
	return envType() === "web";
}

function isNode() {
	return envType() === "node";
}

/**
 * @name 判断相等
 * @param {*} data1 数据1
 * @param {*} data2 数据2
 */
function isEqual(data1, data2) {
	if (data1 === data2) {
		return true;
	}
	if (isArray(data1) && isArray(data2)) {
		if (data1.length !== data2.length) {
			return false;
		}
		return data1.map((v, i) => {
			for (let j = 0; j < data2.length; j++) {
				if (isEqual(data1[i], data2[j])) {
					data2.splice(j, 1);
					return true;
				}
			}
			return false;
		}).every(v => v);
	} else if (data1 && data2 && isObject(data1) && isObject(data2)) {
		const keys1 = Object.keys(data1);
		const keys2 = Object.keys(data2);
		if (keys1.length !== keys2.length) {
			return false;
		}
		return keys1.map(key => isEqual(data1[key], data2[key])).every(v => v);
	}
	return false;
}

/**
 * @name 数据类型
 * @param {*} data 数据
 * @param {*} type 类型
 */
function TypeOf(data, type) {
	const dataType = Object.prototype.toString.call(data).replace(/\[object (\w+)\]/, "$1").toLowerCase();
	return type ? dataType === type : dataType;
}

/**
 * @name 判断基础数据类型：undefined、null、string、number、boolean、array、object、symbol、date、regexp、function、class
 * @param {*} data 数据
 */
function isUndefined(data) {
	return TypeOf(data, "undefined");
}

function isNull(data) {
	return TypeOf(data, "null");
}

function isString(data) {
	return TypeOf(data, "string");
}

function isNumber(data) {
	return TypeOf(data, "number");
}

function isBoolean(data) {
	return TypeOf(data, "boolean");
}

function isArray(data) {
	return TypeOf(data, "array");
}

function isObject(data) {
	return TypeOf(data, "object");
}

function isClass(data) {
	const classRegexp = /^class\s|^function\s+[A-Z]/;
	return TypeOf(data, "function") && classRegexp.test(data.toString());
}

/**
 * @name 判断复合数据类型：set、map、weakset、weakmap
 * @param {*} data 数据
 */
function isSet(data) {
	return TypeOf(data, "set");
}

function isMap(data) {
	return TypeOf(data, "map");
}

function isWeakSet(data) {
	return TypeOf(data, "weakset");
}

function isWeakMap(data) {
	return TypeOf(data, "weakmap");
}

/**
 * @name 判断函数类型：asyncfunction、function、arguments
 * @param {*} data 数据
 */
function isAsyncFunction(data) {
	return TypeOf(data, "asyncfunction");
}

function isSyncFunction(data) {
	return TypeOf(data, "function");
}

function isArguments(data) {
	return TypeOf(data, "arguments");
}

/**
 * @name 判断空类型：error、empty、emptyarray、emptyobject
 * @param {*} data 数据
 */
function isError(data) {
	return data instanceof Error;
}

function isEmpty(data) {
	return !data; // undefined null "" 0 false NaN
}

function isEmptyArray(data) {
	return Array.isArray(data) && !data.length;
}

function isEmptyObject(data) {
	return isObject(data) && !Object.keys(data).length;
}

function isSymbol(data) {
	return TypeOf(data, "symbol");
}

function isDate(data) {
	return TypeOf(data, "date");
}

function isRegExp(data) {
	return TypeOf(data, "regexp");
}

function isFunction(data) {
	return TypeOf(data, "function");
}


export {
	compareObj,
	envType,
	isArguments,
	isArray,
	isAsyncFunction,
	isBoolean,
	isClass,
	isDate,
	isEmpty,
	isEmptyArray,
	isEmptyObject,
	isEqual,
	isError,
	isFunction,
	isMap,
	isNode,
	isNull,
	isNumber,
	isObject,
	isRegExp,
	isSet,
	isString,
	isSymbol,
	isSyncFunction,
	isUndefined,
	isWeakMap,
	isWeakSet,
	isWeb,
	TypeOf
};

export default {
	envType, // 环境类型
	isArguments, // 判断Arguments
	isArray, // 判断数组
	isAsyncFunction, // 判断异步函数
	isBoolean, // 判断布尔值
	isClass, // 判断类
	isDate, // 判断日期
	isEmpty, // 判断空
	isEmptyArray, // 判断空数组
	isEmptyObject, // 判断空对象
	isError, // 判断错误
	isFunction, // 判断函数
	isMap, // 判断Map
	isNode, // 判断Node
	isNull, // 判断空值
	isNumber, // 判断数值
	isObject, // 判断对象
	isRegExp, // 判断正则
	isSet, // 判断Set
	isString, // 判断字符串
	isSymbol, // 判断Symbol
	isSyncFunction, // 判断同步函数
	isUndefined, // 判断未定义
	isWeakMap, // 判断WeakMap
	isWeakSet, // 判断WeakSet
	isWeb, // 判断Web
	TypeOf // 数据类型
};
