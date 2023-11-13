'use client';
// svg from https://materialdesignicons.com/icon/brightness-6

export function ThemeToggler() {
    function toggleTheme() {
        document.body.classList.toggle("dark");
        document.body.classList.toggle("light");
    }

    return (
        <div className={"absolute top-6 right-8 w-8 y-8 opacity-30"} onClick={toggleTheme}>
            <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12,18V6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,15.31L23.31,12L20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31Z" /></svg>
        </div>
    )
}
