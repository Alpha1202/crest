let allUser = document.querySelector('.selected-user-box');

let activeAccounts = document.querySelector('.active-accounts-box');

let deactiveAccounts = document.querySelector('.deactive-accounts-box');

let header = document.querySelector('.tableText');


activeAccounts.addEventListener('click', () => {
  activeAccounts.classList.add('selected');
  allUser.classList.remove('selected');
  deactiveAccounts.classList.remove('selected');
  header.innerText = 'Active Accounts';
});

allUser.addEventListener('click', () => {
  activeAccounts.classList.remove('selected');
  deactiveAccounts.classList.remove('selected');
  allUser.classList.add('selected');
  header.innerText = 'All Users';
});

deactiveAccounts.addEventListener('click', () => {
  activeAccounts.classList.remove('selected');
  deactiveAccounts.classList.add('selected');
  allUser.classList.remove('selected');
  header.innerText = 'Deactivated Accounts';
});
// activeAccounts.onclick = function selected(){
//   document.getElementById('active-accounts-box').className = 'selected';
// }