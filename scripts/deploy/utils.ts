import * as fs from "fs";

const mkdirp = require('mkdirp')

export function saveFile(dirPath: string, fileName: string, data: string) {
    mkdirp(dirPath).then(() => {
        fs.writeFileSync(dirPath + fileName, data);
    })
}

export function loadFile(dirPath: string, fileName: string): string {
    return fs.readFileSync(dirPath + fileName, {encoding: "utf8"});
}
