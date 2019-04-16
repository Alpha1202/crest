
let modal = document.getElementById('myModal');

let modal1 = document.getElementById('loginModal');

let modal2 = document.getElementById('adminModal');

let modalTrigger = document.getElementById('signUp');

let adminModalTrigger = document.getElementById('admin');

let modalTrigger2 = document.getElementById('signUp-small');

let modalTrigger3 = document.getElementById('login');

let modalClose = document.getElementsByClassName('modal-close')[0];

adminModalTrigger.onclick = function(){
modal2.style.display = 'block';
}

modalTrigger.onclick =  function(){
     modal.style.display = 'block';
 }

 modalTrigger2.onclick =   function(){
    modal.style.display = 'block';
}

modalTrigger3.onclick =   function(){
    modal1.style.display = 'block';
}

 modalClose.onclick = function(){
     modal.style.display = 'none';
 }

 modalClose.onclick = function(){
    modal1.style.display = 'none';
}
modalClose.onclick = function(){
    modal2.style.display = 'none';
}

 window.onclick = function(event) {
     if (event.target == modal) {
         modal.style.display = 'none';
     }
 }
