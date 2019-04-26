

const admin = document.getElementById('check');

const signin = document.getElementById('signin');
 

 signin.addEventListener('click', () => {
  if(admin.value.toLowerCase() === "admin" || admin.value.toLowerCase() === "staff") {
  location.replace('./admin-dashboard.html')
 } 
});

signin.addEventListener('click', () => {
if(admin.value.toLowerCase() === "client" || admin.value.toLowerCase() === "user") {
  location.replace('./user-dashboard.html')
 }
});