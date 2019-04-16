let modal2 = document.getElementById('adminModal');

let adminModalTrigger = document.getElementById('admin');

let modalClose = document.getElementsByClassName('modal-close');

adminModalTrigger.onclick = function(){
    modal2.style.display = 'block';
 }

 modalClose.onclick = function(){
    modal2.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal2) {
        modal2.style.display = 'none';
    }
}