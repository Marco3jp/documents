import {config} from "../../../model/config";
import {getFilePathLists} from "@/lib/fs";

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
    return (
        <main>
            <p>hello world</p>
            <p>{params.paths}</p>
        </main>
    )
}
