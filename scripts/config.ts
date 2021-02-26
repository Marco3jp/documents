import DeployConfig, {defaultDeployConfig} from "./deploy/model/config";
import RuntimeConfig, {defaultRuntimeConfig} from "./runtime/model/config";

export interface CommonConfig {
    manuscript_dir: string
}

export const defaultCommonConfig: CommonConfig = {
    manuscript_dir: "manuscript"
}

export const config: DeployConfig & RuntimeConfig & CommonConfig = {
    ...defaultDeployConfig,
    ...defaultRuntimeConfig,
    ...defaultCommonConfig,
    is_hidden_draft: false,
}
