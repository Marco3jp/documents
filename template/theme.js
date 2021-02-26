const changeThemeElm = document.createElement("li");
changeThemeElm.textContent = "Toggle theme";

changeThemeElm.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
})

const menuElm = document.querySelector("#menu");
if (menuElm) {
    menuElm.appendChild(changeThemeElm);
}

/*
  thank you svg from https://materialdesignicons.com/icon/brightness-6
*/
