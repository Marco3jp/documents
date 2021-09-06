import * as fs from "fs";
import {Converter} from "./converter";
import {config} from "../config";

const mkdirp = require('mkdirp')

const splitDir = __dirname.split("/");

// TODO: プロジェクトルートの実装が他に思い浮かばないので誰か頼んだ
splitDir.splice(splitDir.length - 2, 2);

let PROJECT_ROOT = "";

splitDir.forEach(dirname => {
    PROJECT_ROOT += dirname + "/";
})

const OUT_DIR = PROJECT_ROOT + config.out_dir;

const converter = new Converter(PROJECT_ROOT, OUT_DIR);

converter.processFiles(config.markdown_dir);

copyFiles();

function copyFiles() {
    let css = fs.readFileSync(PROJECT_ROOT + config.template.dir + "/" + config.template.css, {encoding: "utf8"});
    let theme = fs.readFileSync(PROJECT_ROOT + config.template.dir + "/" + config.template.js.theme, {encoding: "utf8"});
    let highlightCSS;

    if (config.template.highlight_css !== '') {
        highlightCSS = fs.readFileSync(PROJECT_ROOT + config.template.dir + "/" + config.template.highlight_css, {encoding: "utf8"});
    }

    mkdirp(OUT_DIR).then(() => {
        fs.writeFileSync(OUT_DIR + "/" + config.template.css, css);
        fs.writeFileSync(OUT_DIR + "/" + config.template.js.theme, theme);

        if (highlightCSS) {
            fs.writeFileSync(OUT_DIR + "/" + config.template.highlight_css, highlightCSS);
        }
    });
}
