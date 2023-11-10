import {config} from "../../../model/config";
import {getFilePathLists} from "@/lib/fs";
import * as fs from "fs";

export default function Page() {
    const articleDir = process.cwd() + '/../' + config.markdown_dir
    const pathLists = getFilePathLists(articleDir, articleDir)
    const pages = pathLists.map(pathList => {
        const href = "../" + pathList.join('/')


        // ファイルのあるディレクトリの名前
        const dirName = pathList.length > 1 ? process.cwd() + '/../' + config.markdown_dir + '/' + pathList.slice(0, pathList.length - 1).join('/') : process.cwd() + '/../' + config.markdown_dir

        // ファイル名
        const fileName = fs.existsSync(dirName + '/' + `${pathList[pathList.length-1]}.md`) ? `${pathList[pathList.length-1]}.md` : `${pathList[pathList.length-1]}.html`

        const file = fs.readFileSync(dirName + '/' + fileName, 'utf-8')

        const regexResult = /(^# (?<md_title>.*))|(<h1.*>(?<html_title>.*)<\/h1>)/.exec(file)
        const title = regexResult?.groups?.md_title
            ? regexResult?.groups?.md_title
            : (regexResult?.groups?.html_title
                ? regexResult?.groups?.html_title
                : "no title");

        return {
            href,
            title
        }
    })

    const liElements = pages.map(page => {
        return (
            <li key={page.href}><a href={page.href}>{page.title}</a></li>
        )
    })

    return (
        <main id="wrapper">
            <h1>記事一覧</h1>
            <ul>{liElements}</ul>
        </main>
    )
}
