const showdown = require('showdown');
const mkdirp = require('mkdirp')
import {config} from "../config";
import * as fs from "fs";

const splitDir = __dirname.split("/");

// TODO: プロジェクトルートの実装が他に思い浮かばないので誰か頼んだ
splitDir.splice(splitDir.length - 2, 2);

let PROJECT_ROOT = "";

splitDir.forEach(dirname => {
    PROJECT_ROOT += dirname + "/";
})

const OUT_DIR = PROJECT_ROOT + config.out_dir;

processFiles(config.markdown_dir);

copyFiles();

function processFiles(relativePath: string) {
    const files = fs.readdirSync(PROJECT_ROOT + relativePath);
    files.forEach(file => {
        if (file.includes(".md")) {
            exportHTML(relativePath + "/", file, true);
        } else if (file.includes(".html")) {
            exportHTML(relativePath + "/", file);
        } else {
            processFiles(relativePath + "/" + file);
        }
    })
}

function exportHTML(relativeDirPath: string, fileName: string, enableConvert: boolean = false) {
    const file = fs.readFileSync(PROJECT_ROOT + relativeDirPath + fileName, {encoding: "utf8"});
    let exportDirPath = ""
    let paths = relativeDirPath.split("/");
    paths.splice(0, 1);
    paths.forEach(path => {
        exportDirPath += "/" + path;
    });

    let sourceCode = "";

    if (enableConvert) {
        const converter = new showdown.Converter();
        sourceCode = converter.makeHtml(file);
        fileName = fileName.replace(".md", ".html");
    } else {
        sourceCode = file;
    }

    sourceCode = mergeTemplate(sourceCode, exportDirPath.split("/").length - 2);

    mkdirp(OUT_DIR + exportDirPath).then(() => {
        fs.writeFileSync(OUT_DIR + exportDirPath + fileName, sourceCode);
    })
}

function mergeTemplate(convertedString: string, depth: number): string {
    let template = fs.readFileSync(PROJECT_ROOT + config.template.dir + "/" + config.template.html, {encoding: "utf8"});
    template = replaceTokens(template);

    template = template.replace(config.template.replace_token.converted_markdown, convertedString);
    let relativePathToken = "";
    for (let i = 0; i < depth; i++) {
        relativePathToken += "../";
    }
    return template.replace(new RegExp(config.template.replace_token.relative_path, 'g'), relativePathToken);
}

function replaceTokens(template): string {
    template = template.replace(config.template.replace_token.css, config.template.css)
    template = template.replace(config.template.replace_token.js.theme, config.template.js.theme);
    return template;
}

function copyFiles() {
    let css = fs.readFileSync(PROJECT_ROOT + config.template.dir + "/" + config.template.css, {encoding: "utf8"});
    let theme = fs.readFileSync(PROJECT_ROOT + config.template.dir + "/" + config.template.js.theme, {encoding: "utf8"});

    mkdirp(OUT_DIR).then(() => {
        fs.writeFileSync(OUT_DIR + "/" + config.template.css, css);
        fs.writeFileSync(OUT_DIR + "/" + config.template.js.theme, theme);
    });
}
