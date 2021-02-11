import DeployConfig, {defaultDeployConfig} from "./deploy/model/config";
import RuntimeConfig, {defaultRuntimeConfig} from "./runtime/model/config";

export const config: DeployConfig & RuntimeConfig = {
    ...defaultDeployConfig,
    ...defaultRuntimeConfig,
    is_hidden_draft: false,
}
