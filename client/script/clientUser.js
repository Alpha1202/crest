/* eslint-disable no-undef */
const userName = document.getElementById('username');
// const accountName = document.getElementById('accountName');
const accountNumber = document.getElementById('accountNumber');
const accountBalance = document.getElementById('accountBalance');
const accountType = document.getElementById('accountType');
const accountStatus = document.getElementById('accountStatus');
const accBal = document.getElementById('accBal');
const accType = document.getElementById('accType');
const errorSpan = document.getElementById('errorSpan');
const transactionError = document.getElementById('transactionError');
const transactionBox = document.getElementById('transactionBox');
const transactionTable = document.getElementById('transactionTable');
const createAccount = document.getElementById('createAccount');
const accountTypeRadio = document.getElementsByName('account');


const savings = document.getElementById('savings');
const current = document.getElementById('current');
const openAccount = document.getElementById('openAccount');
const accountError = document.getElementById('accountError');



const invalidToken = () => {
  window.location = './login.html';
};

const { bankaUserEmail, bankaUserfirstName, bankaUserlastName, bankaUserToken } = localStorage;

if (!bankaUserToken) {
  invalidToken();
}

const logout = () => {
  localStorage.removeItem('bankaUserToken');
  window.location = './index.html';
};

document.getElementById('logout').addEventListener('click', logout);


const defaultUrl = 'https://crestfinance.herokuapp.com/api/v1';


const HeaderSettings = () => ({ authorization: bankaUserToken });

const userAccountConfig= {
  headers: HeaderSettings(),
};

const firstName = JSON.parse(bankaUserfirstName);
const lastname = JSON.parse(bankaUserlastName);

userName.textContent = `${firstName.toUpperCase()} ${lastname.toUpperCase()}`;

fetch(`${defaultUrl}/users/${bankaUserEmail}/accounts`, userAccountConfig)

  .then(res => res.json())
  .then((res) => {
    const { error, data } = res;
    if (error) {
      errorSpan.innerHTML = error;
      errorSpan.style.color = 'red';
    }
    if (data) {
      const { accountnumber, balance, status, type } = data[0];
      localStorage.bankaUserAccountNumber = accountnumber;
      accountNumber.textContent = `${accountnumber}`;
      accountBalance.textContent = `$${balance}`;
      accountType.textContent = `${type}`;
      accountStatus.textContent = `${status}`;
      accBal.textContent = `Account Balance:  $${balance}`;
      accType.textContent = `Account Type:  ${type}`;
    }
  })
  .catch(error => error);
const { bankaUserAccountNumber } = localStorage;
console.log(bankaUserAccountNumber);

fetch(`${defaultUrl}/accounts/${bankaUserAccountNumber}/transactions`, userAccountConfig)
  .then(res => res.json())
  .then((res) => {
    const { error, data } = res;

    if (data.length === 0) {
      transactionBox.style.display = 'none';
      transactionError.textContent = 'This Account has no transaction History';
      transactionError.style.color = 'red';
    }
    if (error) {
      transactionError.textContent = error;
      transactionError.style.color = 'red';
    }
    if (data) {
      let output = '';
      data.forEach((transaction) => {
        output += `
        <div class="table-row2" id="transactionTable">
      <div class="table-content">${transaction.accountnumber}</div>
      <div class="table-content">${transaction.type}</div>
      <div class="table-content">$${transaction.oldbalance}</div>
      <div class="table-content">$${transaction.newbalance}</div>
      <div class="table-content">$${transaction.amount}</div>
      </div>
      `;
      });
      transactionBox.innerHTML += output;
    }
  });

createAccount.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const form = {};

  if (savings.value === 'savings') {
    form.type = savings.value;
  }
  if (current.value === 'current') {
    form.type = current.value;
  }
  const createAccountConfig = {
    method: 'POST',
    headers:  {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: bankaUserToken,
    },
    body: JSON.stringify(form),

  };
  
  fetch(`${defaultUrl}/accounts`, createAccountConfig)
    .then(res => res.json())
    .then((res) => {
      const { error, data } = res;
      if (error) {
        accountError.innerHTML = error;
        accountError.style.color = 'red';
      }
      if (data) {
        accountError.innerHTML = 'Account Created Successfully';
        accountError.style.color = 'green';
        window.location = './user-dashboard.html';
      }
      console.log(res);
    });
});

