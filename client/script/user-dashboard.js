
const openDashboard = document.getElementById('dashboard');

const sideMenu = document.querySelector('.top-box');

const open = document.getElementById('links');

const modal = document.getElementById('Modal');

const close = document.querySelector('.modal-close');
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

