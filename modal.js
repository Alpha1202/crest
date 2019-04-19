
let modal = document.querySelector('#myModal');

let modal1 = document.querySelector('#loginModal');

let modal2 = document.querySelector('#dminModal');

let modalTrigger = document.querySelector('#signUp');

let modalTrigger2 = document.querySelector('#signUp-small');

let modalTrigger3 = document.querySelector('#login');

let modalClose = document.querySelectorAll('.modal-close');


modalTrigger.onclick =  function(){
     modal.style.display = 'block';
 }

 modalTrigger2.onclick =   function(){
    modal.style.display = 'block';
}

modalTrigger3.onclick =   function(){
    modal1.style.display = 'block';
}

//  modalClose.onclick = function(){
//      modal.style.display = 'none';
//  }

 modalClose.onclick = function(){
    modal1.style.display = 'none';
}
// modalClose.onclick = function(){
//     modal2.style.display = 'none';
// }

 window.onclick = function(event) {
     if (event.target == modal) {
         modal.style.display = 'none';
     }
 }
