import {createApp} from 'vue'
import App from './App.vue'

const openEditorElm = document.createElement("li");
openEditorElm.textContent = "Edit article";

openEditorElm.addEventListener("click", () => {
    createApp(App).mount('#editor');
})

const menuElm = document.querySelector("#menu");
if (menuElm) {
    menuElm.appendChild(openEditorElm);
}
