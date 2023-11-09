import {config} from "../../../model/config";
import {getFilePathLists} from "@/lib/fs";
import * as fs from "fs";
import {markedConfig} from "../../../marked.config";
import {marked} from "marked";
import {mangle} from "marked-mangle";
import {gfmHeadingId} from "marked-gfm-heading-id";
import hljs from 'highlight.js';
import {markedHighlight} from 'marked-highlight';
import {Fragment, ReactElement} from "react";

export async function generateStaticParams() {
    const articleDir = process.cwd() + '/../' + config.markdown_dir
    const pathLists = getFilePathLists(articleDir, articleDir)
    return pathLists.map(pathList => {
        return {
            paths: pathList
        }
    })
}

export default function Page({ params }: { params: { paths: string[] } }) {
    marked.use(markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code: string, lang: string) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        }
    }));
    marked.use(gfmHeadingId())
    marked.use(mangle())

    const {paths} = params

    // ファイルのあるディレクトリの名前
    const dirName = paths.length > 1 ? process.cwd() + '/../' + config.markdown_dir + '/' + paths.slice(0, paths.length - 1).join('/') : process.cwd() + '/../' + config.markdown_dir

    // ファイル名
    const fileName = fs.existsSync(dirName + '/' + `${paths[paths.length-1]}.md`) ? `${paths[paths.length-1]}.md` : `${paths[paths.length-1]}.html`

    const file = fs.readFileSync(dirName + '/' + fileName, 'utf-8')
    const sourceCode = fileName.includes(".md") ? marked(file, markedConfig) : file;

    return (
        <main id="wrapper" dangerouslySetInnerHTML={{__html: sourceCode}}></main>
    )
}
