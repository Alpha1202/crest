
// let index = 0;
// slide();
// function slide() {
//     let i;
//     let x = document.getElementsByClassName('slide');
//     for (i = 0; i < x.length; i++) {
//         x[i].style.display = "none";
//     }
//     index++;
//     if(index > x.length) {
//         index = 1
//     }
//     x[index-1].style.display = "flex";
//     setTimeout(slide, 5000);
// }
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