export function openmenu() {
    let menuItems = document.querySelectorAll('.menu-list')
    let menuToggler = document.querySelector('.logo')

    menuToggler.onclick = function () {
        menuToggler.classList.toggle('open')
        let s = 0
        for (const menuItem of menuItems) {
            setTimeout(function () {
                menuItem.classList.toggle('open')
            }, s)
            s += 50
        }
    }
}

