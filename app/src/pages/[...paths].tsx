import {config} from "../../model/config";
import {getFilePathLists} from "@/lib/fs";
import * as fs from "fs";
import {markedConfig} from "../../marked.config";
import {marked} from "marked";
import {mangle} from "marked-mangle";
import {gfmHeadingId} from "marked-gfm-heading-id";
import hljs from 'highlight.js';
import {markedHighlight} from 'marked-highlight';
import {useRouter} from "next/router";
import Error from "next/error";

export async function getStaticPaths(): Promise<{paths: {params: {paths: string[]}}[], fallback:boolean}> {
    const articleDir = process.cwd() + '/../' + config.markdown_dir
    const pathLists = getFilePathLists(articleDir, articleDir)

    const routingByPath: { params: {paths: string[]} }[] = pathLists.map(pathList => {
        return {
            params: {
                paths: pathList
            }
        }
    })

    return {
        paths: routingByPath.flat(),
        fallback: false
    }
}

export async function getStaticProps({ params }: { params: { paths: string[] } }) {
    const {paths} = params

    // ファイルのあるディレクトリの名前
    const dirName = paths.length > 1 ? process.cwd() + '/../' + config.markdown_dir + '/' + paths.slice(0, paths.length - 1).join('/') : process.cwd() + '/../' + config.markdown_dir

    // ファイル名
    const fileName = fs.existsSync(dirName + '/' + `${paths[paths.length-1]}.md`) ? `${paths[paths.length-1]}.md` : `${paths[paths.length-1]}.html`

    const file = fs.readFileSync(dirName + '/' + fileName, 'utf-8')
    const sourceCode = fileName.includes(".md") ? marked(file, markedConfig) : file;

    return {
        props: {
            sourceCode
        }
    }
}

export default function Paths({sourceCode}: { sourceCode: string | null}) {
    const router = useRouter()
    const {paths: rawPaths} = router.query

    if (!rawPaths || sourceCode === null) {
        return <Error statusCode={500}></Error>
    }

    marked.use(markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code: string, lang: string) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        }
    }));
    marked.use(gfmHeadingId())
    marked.use(mangle())

    return (
        <main id="wrapper" dangerouslySetInnerHTML={{__html: sourceCode}}></main>
    )
}
