/** 字符工具 **/
import { MATCH } from "./regexp.js";

/**
 * @name 脱敏手机
 * @param {string} [phone=""] 手机
 */
function desePhone (phone = "") {
	return MATCH.phone.regexp.test(phone)
		? phone.toString().replace(/(\d{3})\d*(\d{4})/g, "$1****$2")
		: phone;
}

/**
 * @name 格式手机
 * @param {string} [phone=""] 手机
 * @param {string} [sign="-"] 标记：-、\s
 */
function formatPhone (phone = "", sign = "-") {
	return MATCH.phone.regexp.test(phone) && ["-", " "].includes(sign)
		? phone.toString().replace(/(\d{3})(\d{4})(\d{4})/g, `$1${sign}$2${sign}$3`)
		: phone;
}

/**
 * 随机串
 * @param {number} [len=32] 长度 在1~10之间
 */
function randomString (len = 32) {
	var $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
	var maxPos = $chars.length;
	var pwd = "";
	for (let i = 0; i < len; i++) {
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return pwd;
}

/**
 * @name 随机HEX色值
 */
function randomColor () {
	return "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0");
}

/**
 * @name 随机长度ID
 * @param {number} [len=3] 长度 在1~10之间
 */
function randomId (len = 5) {
	(len < 1 || len > 10) && (len = 5);
	return Math.random().toString(36).substr(3, len);
}

/**
 * @name 移除标签
 * @param {string} [text=""] 文本
 */
function removeTag (text = "") {
	return text.replace(/<[^>]*>/g, "");
}

/**
 * @name 翻转文本
 * @param {string} [text=""] 文本
 */
function reverseText (text = "") {
	return text.split("").reduceRight((t, v) => t + v);
}

/**
 * @name 星级评分
 * @param {number} [rate=0] 星级 在0~5之间
 * @param {number} [len=5] 长度
 */
function startScore (rate = 0, len = 5) {
	(rate < 0) && (rate = 0);
	(rate > len) && (rate = len);
	return [
		...Array.from(new Array(len).keys()).fill("★"),
		...Array.from(new Array(len).keys()).fill("☆")
	].join("").slice(len - rate, len * 2 - rate);
}

export {
	desePhone,
	formatPhone,
	randomColor,
	randomId,
	randomString,
	removeTag,
	reverseText,
	startScore
};