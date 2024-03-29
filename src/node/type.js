/** 类型工具 **/
import Os from "os";

import { runCmd } from "./process.js";

/**
 * @name Node类型
 */
function nodeType () {
    const info = Os.type().toLocaleLowerCase();
    const testUa = regexp => regexp.test(info);
    /* eslint-disable sort-keys */
    const systemMap = {
        windows: /windows/g, // windows系统
        macos: /darwin/g, // macos系统
        linux: /linux/g // linux系统
    };
    /* eslint-enable */
    const system = Object.keys(systemMap).find(v => testUa(systemMap[v])) || "unknow";
    return {
        nodeVs: runCmd("node -v").replace(/(v|\n|\r\n)/g, ""),
        npmVs: runCmd("npm -v").replace(/\n/g, ""),
        system,
        systemVs: Os.release().split("-")[0]
    };
}

export {
    nodeType
};