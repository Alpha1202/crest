const openDashboard = document.getElementById('dashboard');

const sideMenu = document.querySelector('.top-box');

const open = document.getElementById('links');

const modal = document.getElementById('Modal');

const close = document.querySelector('.modal-close');

const dropdown = document.getElementsByClassName("dropdown-btn");

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


let i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}