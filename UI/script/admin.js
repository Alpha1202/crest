let allUser = document.querySelector('.selected-user-box');

let activeAccounts = document.querySelector('.active-accounts-box');

let deactiveAccounts = document.querySelector('.deactive-accounts-box');

let sideUsers = document.querySelector('#side-users');

let sideActive = document.querySelector('#side-active');

let sideDeactive = document.querySelector('#side-deactive');

let header = document.querySelector('.tableText');

const activeToggle = (activeAccounts, sideActive, allUser, sideUsers, sideDeactive, deactiveAccounts, msg) => {
  activeAccounts.addEventListener('click', () => {
    activeAccounts.classList.add('selected');
    sideActive.classList.add('selected');
    allUser.classList.remove('selected');
    sideUsers.classList.remove('selected');
    sideDeactive.classList.remove('selected');
    deactiveAccounts.classList.remove('selected');
    header.innerText = msg;
  });
}
activeToggle(activeAccounts, sideActive, allUser, sideUsers, sideDeactive, deactiveAccounts, 'Active Accounts');
activeToggle(sideActive, activeAccounts, allUser, sideUsers, sideDeactive, deactiveAccounts, 'Active Accounts');
activeToggle(allUser, sideUsers, activeAccounts, deactiveAccounts, sideActive, sideDeactive, 'All Users');
activeToggle(sideUsers,allUser, activeAccounts, deactiveAccounts, sideActive, sideDeactive, 'All Users');
activeToggle(deactiveAccounts, sideDeactive, allUser, sideUsers, activeAccounts, sideActive, 'Deactive Accounts');
activeToggle(sideDeactive, deactiveAccounts, allUser, sideUsers, activeAccounts, sideActive, 'Deactive Accounts');

