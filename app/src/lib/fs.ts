// 引数で渡されたディレクトリパスから再帰的に走査する
// basePathが /dir1/dir2 だったとして、ファイルが /dir1/dir2/dir3/file.html だった場合、['dir3', 'file']として示される
// これをすべてのファイルに対して行い、
import * as fs from "fs";

export function getFilePathLists(targetPath: string, basePath: string): string[][] {
    const result: string[][] = []
    const fileNames = fs.readdirSync(targetPath);

    fileNames.forEach(fileName => {
        if (fileName.includes(".md") || fileName.includes(".html")) {
            result.push(getSplitPathFromBasePath(targetPath + "/" + fileName.replace(/(\.md|\.html)/, ''), basePath))
        } else {
            // FIXME: たぶんこれプロジェクトにmd, html以外のファイルが来たら壊れそう
            result.push(...getFilePathLists(targetPath + "/" + fileName, basePath))
        }
    })

    return result
}

function getSplitPathFromBasePath(targetPath: string, basePath: string): string[] {
    // targetPathからbasePathを消して、先頭に / があれば消して、残った / でスプリットして返してやるやつ
    return targetPath.replace(basePath, '').replace(/^\//, '').split('/')
}
