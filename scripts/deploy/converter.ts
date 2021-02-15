import * as fs from "fs";
import {config} from "../config";
import {Article} from "./model/article";

const showdown = require('showdown');
const mkdirp = require('mkdirp')

export class Converter {
    projectRoot: string;
    outDir: string;
    articleList: Array<Article>

    constructor(projectRoot: string, outDir: string) {
        this.projectRoot = projectRoot;
        this.outDir = outDir;
        this.articleList = [];
    }

    processFiles(relativePath: string) {
        const fileNames = fs.readdirSync(this.projectRoot + relativePath);

        fileNames.forEach(fileName => {
            if (fileName.includes(".md") || fileName.includes(".html")) {
                let sourceCodeBody: string;
                let enableConvert = fileName.includes(".md");
                let convertedFileName = fileName.includes(".md") ? fileName.replace(".md", ".html") : fileName;
                const fileBody = this.loadFile(this.projectRoot + relativePath + "/", fileName);

                sourceCodeBody = this.exportHTMLBody(fileBody, enableConvert);

                let exportDirPath = "";
                let paths = relativePath.split("/");
                paths.splice(0, 1);
                paths.forEach(path => {
                    exportDirPath += "/" + path;
                });

                const sourceCode = this.mergeTemplate(sourceCodeBody, [...exportDirPath.matchAll(/\//g)].length);
                this.saveFile(this.outDir + exportDirPath + "/", convertedFileName, sourceCode);

                const title: string | undefined = /<h1.*>(?<title>.*)<\/h1>/.exec(sourceCode).groups.title;

                this.exportList("." + exportDirPath + "/", convertedFileName, title ?? convertedFileName);
            } else {
                this.processFiles(relativePath + "/" + fileName);
            }
        });

        const articleListPageBody = this.createArticleListPage();
        const articleListPage = this.mergeTemplate(articleListPageBody, [...config.list.dir.matchAll(/\//g)].length);
        this.saveFile(this.projectRoot + config.out_dir + "/" + config.list.dir, config.list.file_name, articleListPage);
    }

    loadFile(dirPath: string, fileName: string): string {
        return fs.readFileSync(dirPath + fileName, {encoding: "utf8"});
    }

    saveFile(dirPath: string, fileName: string, data: string) {
        mkdirp(dirPath).then(() => {
            fs.writeFileSync(dirPath + fileName, data);
        })
    }

    exportHTMLBody(fileBody: string, enableConvert: boolean = false): string {
        let sourceCode = "";

        if (enableConvert) {
            const converter = new showdown.Converter();
            sourceCode = converter.makeHtml(fileBody);
        } else {
            sourceCode = fileBody;
        }

        return sourceCode
    }

    exportList(filePath: string, fileName: string, articleTitle: string) {
        this.articleList.push({
            path: filePath,
            fileName: fileName,
            title: articleTitle
        })
    }

    createArticleListPage(): string {
        let sourceCodeBody = "<h1>記事一覧</h1><ul>";
        this.articleList.forEach(article => {
            sourceCodeBody += `<li><a href="${article.path}${article.fileName}">${article.title}</a></li>`;
        })
        sourceCodeBody += "</ul>";

        return sourceCodeBody;
    }

    mergeTemplate(convertedString: string, depth: number): string {
        let template = fs.readFileSync(this.projectRoot + config.template.dir + "/" + config.template.html, {encoding: "utf8"});
        template = this.replaceTokens(template);

        template = template.replace(config.template.replace_token.converted_markdown, convertedString);
        let relativePathToken = "";
        for (let i = 0; i < depth; i++) {
            relativePathToken += "../";
        }
        return template.replace(new RegExp(config.template.replace_token.relative_path, 'g'), relativePathToken);
    }

    replaceTokens(template): string {
        template = template.replace(config.template.replace_token.css, config.template.css)
        template = template.replace(config.template.replace_token.js.theme, config.template.js.theme);
        return template;
    }

}


