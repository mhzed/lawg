"use strict";
/*
  paras: what to log, if an object then it will be converted to JSON
*/
Object.defineProperty(exports, "__esModule", { value: true });
let debug = false;
if (typeof process !== 'undefined') {
    debug = process.env['NODE_DEBUG'] ? true : false;
}
function default_1(...paras) {
    let ts = function () {
        let dateTs = new Date();
        let sts = dateTs + "";
        let sms = `${dateTs.getMilliseconds()}`;
        let pad = 3 - sms.length;
        for (let i = 0, end = pad, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
            sms = `0${sms}`;
        }
        return sts.slice(4, 24) + "." + sms + sts.slice(24, 33);
    }();
    let inspect = function (obj) {
        return JSON.stringify(obj);
    };
    let msg = Array.from(paras).map(para => typeof para === "object" ? inspect(para) : `${para}`).join('');
    if (debug) {
        let e = new Error("");
        let locLine = e.stack.split("\n")[2];
        let m = /\((.*?):(\d+:\d+)\)/.exec(locLine);
        if (!m) {
            m = /at (.*?):(\d+:\d+)/.exec(locLine);
        }
        if (m) {
            let [file, offsets] = Array.from([m[1], m[2]]);
            return console.log(`[${ts}](${file}:${offsets}) ${msg} `);
        }
        else {
            return console.log(`[${ts}](${e.stack}) ${msg} `);
        }
    }
    else {
        return console.log(`[${ts}] ${msg} `);
    }
}
exports.default = default_1;
;
//# sourceMappingURL=index.js.map