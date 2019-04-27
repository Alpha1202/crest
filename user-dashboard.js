
let openDashboard = document.getElementById('dashboard');

let sideMenu = document.querySelector('.top-box');

let open = document.getElementById('links');

let modal = document.getElementById('Modal');

let close = document.querySelector('.modal-close');
if (open !== null) {
    open.onclick = function(){
        modal.style.display = 'flex';
    }
}


close.onclick = function(){
    modal.style.display = 'none';
}

openDashboard.addEventListener('click', () => {
    sideMenu.classList.toggle('side');
})

window.onclick = function(event) {
    if (event.target == sideMenu) {
        sideMenu.style.display = 'none';
    }
}