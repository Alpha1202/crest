
let openDashboard = document.getElementById('dashboard');

let sideMenu = document.getElementById('side');

let open = document.getElementById('links');

let modal = document.getElementById('Modal');

let close = document.querySelector('.modal-close');

open.onclick = function(){
    modal.style.display = 'flex';
}

close.onclick = function(){
    modal.style.display = 'none';
}

openDashboard.onclick = function(){
    sideMenu.style.display = 'flex';
}

// window.onclick = function(event) {
//     if (event.target == sideMenu) {
//         sideMenu.style.display = 'none';
//     }
// }