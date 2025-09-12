document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("theme-toggle");
    const root = document.documentElement;

    // load saved preference
    if (localStorage.getItem("theme") === "dark") {
        root.setAttribute("data-theme", "dark");
    }

    // auto-detect system preference if nothing saved
    if (!localStorage.getItem("theme")) {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            root.setAttribute("data-theme", "dark");
        }
    }

    toggle.addEventListener("click", () => {
        if (root.getAttribute("data-theme") === "dark") {
            root.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
        } else {
            root.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        }
    });
});