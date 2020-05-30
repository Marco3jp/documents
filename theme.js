const changeThemeElm = document.createElement("div");
changeThemeElm.style.position = "absolute";
changeThemeElm.style.top = "24px"
changeThemeElm.style.right = "36px"
changeThemeElm.style.width = "48px";
changeThemeElm.style.height = "48px";
changeThemeElm.innerHTML = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12,18V6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,15.31L23.31,12L20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31Z" /></svg>'

changeThemeElm.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
})

document.body.appendChild(changeThemeElm);

/*
  thank you svg from https://materialdesignicons.com/icon/brightness-6
*/
