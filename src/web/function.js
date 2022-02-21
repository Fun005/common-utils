/** 函数工具 **/
import { stringifyUrlSearch } from "./url.js";

/**
 * @name 异步请求
 * @param {object} [data={}] 参数集合
 * @param {function} [error=null] 失败回调函数
 * @param {function} [success=null] 成功回调函数
 * @param {string} [type="get"] 类型：get、post
 * @param {string} [url=""] 地址
 */
function ajax ({ data = {}, error = null, success = null, type = "get", url = "" }) {
    const xhr = new XMLHttpRequest();
    const method = type.toUpperCase();
    data = stringifyUrlSearch(data);
    if (method === "GET") {
        xhr.open("GET", data ? `${url}${data}` : `${url}?t=${+new Date()}`, true);
        xhr.send();
    } else if (method === "POST") {
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                success && success(xhr.responseText);
            } else {
                error && error(xhr.status);
            }
        }
    };
}

function limitRunTask (tasks, n) {
    return new Promise((resolve, reject) => {
        let index = 0, finish = 0, start = 0, result = [];
        const taskLen = tasks.length;

        function run () {
            if (finish === taskLen) {
                resolve(result);
                return;
            }

            while (start < n && index < taskLen) {
                // 每阶段的任务数量++
                start++;
                let current = index;
                tasks[index++]().then(v => {
                    start--;
                    finish++;
                    result[current] = v;
                    run();
                })
            }
        }

        run();
    })
}

function multipleRequest (urls = [], maxNum) {
    // 请求总数量
    const len = urls.length;
    // 根据请求数量创建一个数组，保存请求的结果
    const result = new Array(len).fill(false);
    // 当前完成数量
    let count = 0;

    return new Promise((resolve, reject) => {
        // 最多请求maxNum
        while (count < maxNum) {
            run();
        }

        function run () {
            let current = count++;

            //处理边界条件
            if (current >= len) {
                // 请求全部完成就将promise置为成功的状态，然后将result作为promise值返回
                !result.includes(false) && resolve(result)
                return;
            }

            const url = urls[current];
            console.time(`start ${current}`);
            fetch(url).then(res => {
                // 保存请求结果
                result[current] = res;
                console.log(`end ${current}, ${new Date().toLocaleString()}`);
                // 请求没有完成，递归执行
                if (current < len) {
                    run();
                }
            }).catch(err => {
                console.time(`end ${current}, ${new Date().toLocaleString()}`);
                result[current] = err;
                // 请求没有完成，递归执行
                if (current < len) {
                    run();
                }
            })
        }
    })
}

export {
    ajax,
    limitRunTask,
    multipleRequest
};