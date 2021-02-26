import {Converter} from "./converter";
import {config} from "../config";
import Duplicator from "./duplicater";

const splitDir = __dirname.split("/");

// TODO: プロジェクトルートの実装が他に思い浮かばないので誰か頼んだ
splitDir.splice(splitDir.length - 2, 2);

let PROJECT_ROOT = "";

splitDir.forEach(dirname => {
    PROJECT_ROOT += dirname + "/";
})

const OUT_DIR = PROJECT_ROOT + config.out_dir;

const converter = new Converter(PROJECT_ROOT, OUT_DIR);
const duplicator = new Duplicator(PROJECT_ROOT, OUT_DIR);

converter.processFiles(config.markdown_dir);

duplicator.duplicateTemplate();
duplicator.duplicateManuscript(config.markdown_dir);
