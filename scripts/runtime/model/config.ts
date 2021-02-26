export default interface RuntimeConfig {
    commit_message_prefix: {
        draft: string, publish: string, edit: string
    },
    is_only_owner_writing: boolean
    is_hidden_draft: boolean,
    draft_file_prefix: string,
}

export const defaultRuntimeConfig: RuntimeConfig = {
    commit_message_prefix: {draft: "draft: ", edit: "edit: ", publish: "publish: "},
    is_hidden_draft: true,
    is_only_owner_writing: true,
    draft_file_prefix: "draft_",
}
