const bntNavbar = document.getElementById("btn-options");
const navbarUniverse = document.getElementById("list-universe");

bntNavbar.addEventListener("click", () => {
    if (navbarUniverse.className == "option") {
        bntNavbar.className = "fa fa-times";
        navbarUniverse.classList.add("active");
    } else {
        bntNavbar.className = "fa fa-align-justify";
        navbarUniverse.classList.remove("active");
    };
});