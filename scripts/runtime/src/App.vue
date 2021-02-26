<template>
  <div id="editor-container">
    <ArticleEditor/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import ArticleEditor from './components/ArticleEditor.vue'

export default defineComponent({
  name: 'App',
  components: {
    ArticleEditor
  }
})
</script>

<style>
#editor-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
}
</style>
