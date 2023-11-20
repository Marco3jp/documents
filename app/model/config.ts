export interface RuntimeConfig {
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


export interface DeployConfig {
    markdown_dir: string,
    out_dir: string,
    list: {
        // TODO: ネストに対応する(ページに飛べなくなる)
        dir: string,
        file_name: string
    },
    template: {
        dir: string,
        html: string,
        css: string,
        highlight_css: string,
        js: {
            theme: string,
        },
        replace_token: {
            title: string,
            css: string,
            highlight_css: string,
            js: {
                theme: string,
            }
            converted_markdown: string
            relative_path: string
        }
    }
}

export const defaultDeployConfig: DeployConfig = {
    markdown_dir: "md",
    out_dir: "dist",
    list: {
        dir: "",
        file_name: "list.html",
    },
    template: {
        dir: 'template',
        html: 'template.html',
        css: 'style.css',
        highlight_css: 'highlight.css',
        js: {
            theme: 'theme.js',
        },
        replace_token: {
            title: "{{ title }}",
            css: "{{ template_css }}",
            highlight_css: "{{ template_highlight_css }}",
            js: {
                theme: "{{ template_js_theme }}"
            },
            converted_markdown: "{{ markdown }}",
            relative_path: "{{ relative_path }}",
        }
    }
}

export const config: DeployConfig & RuntimeConfig = {
    ...defaultDeployConfig,
    ...defaultRuntimeConfig,
    is_hidden_draft: false,
}
