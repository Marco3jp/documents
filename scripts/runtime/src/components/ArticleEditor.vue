<template>
  <div id="article-editor">
    <div id="toolbar">
      <button>Close</button>
      <button>Draft</button>
      <button>Publish</button>
    </div>
    <div id="tui-editor"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Editor from '@toast-ui/editor';
import 'codemirror/lib/codemirror.css'; // Editor's Dependency Style
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style
import {config} from "../../../config";

export default defineComponent({
  name: 'ArticleEditor',
  mounted() {
    this.fetchMarkdown().then(initText => {
      console.log(initText)

      const el = document.querySelector('#tui-editor');

      const editor = new Editor({
        el: el,
        initialEditType: 'markdown',
        height: "calc(100% - 3rem)",
        previewStyle: 'vertical',
        initialValue: initText
      });
      editor.getHtml();
    })
  },
  methods: {
    fetchMarkdown: function (): Promise<string> {
      const splitPath = location.pathname.split("/");
      const markdownFileName = splitPath[splitPath.length - 1].replace(".html", ".md");

      return fetch("./" + config.manuscript_out_dir + "/" + markdownFileName).then(res => {
        console.log(res.headers.get("Content-Type"));
        if (res.ok && res.headers.get("Content-Type") === "text/markdown") {
          return res.text()
        } else {
          return new Promise<string>(resolve => {
            resolve("");
          })
        }
      })
    }

  }
})
</script>

<style scoped>
#article-editor {
  height: 100%;

  #toolbar {
    height: 3rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    button {
      box-sizing: border-box;
      height: 100%;
      padding: 6px 12px;
    }
  }
}
</style>

<style>
/* fix border size... */
.tui-editor-defaultUI {
  box-sizing: border-box;
}
</style>
