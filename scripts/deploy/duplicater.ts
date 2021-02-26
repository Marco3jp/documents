import {config} from "../config";
import * as fs from "fs";

const mkdirp = require('mkdirp')


export default class Duplicator {
    projectRoot: string;
    outDir: string;

    constructor(projectRoot: string, outDir: string) {
        this.projectRoot = projectRoot;
        this.outDir = outDir;
    }

    duplicateTemplate() {
        const templatePath = this.projectRoot + config.template.dir + "/";

        mkdirp(this.outDir + "/").then(() => {
            fs.copyFileSync(templatePath + config.template.css, this.outDir + "/" + config.template.css);
            fs.copyFileSync(templatePath + config.template.js.theme, this.outDir + "/" + config.template.js.theme);
        })
    }

    duplicateManuscript(relativePath) {
        const fileNames = fs.readdirSync(this.projectRoot + relativePath);

        fileNames.forEach(fileName => {
            if (fileName.includes(".md") || fileName.includes(".html")) {
                let exportDirPath = "";
                let paths = relativePath.split("/");
                paths.splice(0, 1);
                paths.forEach(path => {
                    exportDirPath += "/" + path;
                });

                const manuscriptPath = this.outDir + exportDirPath + "/" + config.manuscript_dir + "/";

                mkdirp(manuscriptPath).then(() => {
                    fs.copyFileSync(this.projectRoot + relativePath + "/" + fileName, manuscriptPath + fileName);
                })
            } else {
                // TODO: ディレクトリであるかチェックして
                this.duplicateManuscript(relativePath + "/" + fileName);
            }
        })
    }
}
