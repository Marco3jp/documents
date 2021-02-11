const showdown = require('showdown');
const mkdirp = require('mkdirp')
import {config} from "../config";
import * as fs from "fs";

const splitDir = __dirname.split("/");

// TODO: プロジェクトルートの実装が他に思い浮かばないので誰か頼んだ
splitDir.splice(splitDir.length - 2, 2);

let projectRoot = "";

splitDir.forEach(dirname => {
    projectRoot += dirname + "/";
})

const outDir = projectRoot + config.out_dir;

processFiles(config.markdown_dir);

copyFiles();

function processFiles(relativePath: string) {
    const files = fs.readdirSync(projectRoot + relativePath);
    files.forEach(file => {
        if (file.includes(".md")) {
            exportHTML(relativePath + "/", file);
        } else if (file.includes(".html")) {
            exportHTML(relativePath + "/", file, true);
        } else {
            processFiles(relativePath + "/" + file);
        }
    })
}

function exportHTML(relativeDirPath: string, fileName: string, disableConvert: boolean = false) {
    const file = fs.readFileSync(projectRoot + relativeDirPath + fileName, {encoding: "utf8"});
    let exportDirPath = ""
    let paths = relativeDirPath.split("/");
    paths.splice(0, 1);
    paths.forEach(path => {
        exportDirPath += "/" + path;
    });

    let sourceCode = "";

    if (disableConvert) {
        sourceCode = file;
    } else {
        const converter = new showdown.Converter();
        sourceCode = converter.makeHtml(file);
        fileName = fileName.replace(".md", ".html");
    }

    sourceCode = mergeTemplate(sourceCode, exportDirPath.split("/").length - 2);

    mkdirp(outDir + exportDirPath).then(() => {
        fs.writeFileSync(outDir + exportDirPath + fileName, sourceCode);
    })
}

function mergeTemplate(convertedString: string, depth: number): string {
    let template = fs.readFileSync(projectRoot + config.template.dir + "/" + config.template.html, {encoding: "utf8"});
    template = preReplace(template);

    template = template.replace(config.template.replace_token.converted_markdown, convertedString);
    let relativePathToken = "";
    for (let i = 0; i < depth; i++) {
        relativePathToken += "../";
    }
    return template.replace(new RegExp(config.template.replace_token.relative_path, 'g'), relativePathToken);
}

function preReplace(template): string {
    template = template.replace(config.template.replace_token.css, config.template.css)
    template = template.replace(config.template.replace_token.js.theme, config.template.js.theme);
    return template;
}

function copyFiles() {
    let css = fs.readFileSync(projectRoot + config.template.dir + "/" + config.template.css, {encoding: "utf8"});
    let theme = fs.readFileSync(projectRoot + config.template.dir + "/" + config.template.js.theme, {encoding: "utf8"});

    mkdirp(outDir).then(() => {
        fs.writeFileSync(outDir + "/" + config.template.css, css);
        fs.writeFileSync(outDir + "/" + config.template.js.theme, theme);
    });
}
