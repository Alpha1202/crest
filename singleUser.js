const email = document.getElementById('email');
const accountNumber = document.getElementById('accountNumber');
const accountBalance = document.getElementById('accountBalance');
const accountType = document.getElementById('accountType');
const accountStatus = document.getElementById('accountStatus');
const activate = document.getElementById('activate');
const deactivate = document.getElementById('deactivate');
const credit = document.getElementById('credit');
const debit = document.getElementById('debit');
const deleteAccount = document.getElementById('delete');
const transactionBox = document.getElementById('transactionBox');
const transactionError = document.getElementById('transactionError');
const placeholder = document.getElementById('placeholder');
const placeholderModal = document.querySelector('.placeholder-modal');
const transaction = document.getElementById('transaction');
const closeButton = document.querySelector('.placeholder-close-button');
const closeButtonTransaction = document.getElementById('transaction-close-button');
const modalDisplay = document.getElementById('modal-display');
const transactionModal = document.getElementById('transaction-modal');
const transactionAmount = document.getElementById('amount');






const { staffUserToken } = localStorage;
const invalidToken = () => {
  window.location = './login.html';
};

if (!staffUserToken) {
  invalidToken();
}

const defaultUrl = 'https://crestfinance.herokuapp.com/api/v1';

const HeaderSettings = () => ({ authorization: staffUserToken });

const adminDashboardConfig= {
  headers: HeaderSettings(),
};

const accNum = window.location.href.slice(
  window.location.href.indexOf('?') + 1
);

window.onload = () => {
  fetch(`${defaultUrl}/accounts/${accNum}`, adminDashboardConfig)
    .then(res => res.json())
    .then((res) => {
      const { error, data } = res;
      if (error) {
        modalDisplay.innerHTML = error;
        modalDisplay.style.color = 'red';
        placeholderModal.classList.add('placeholder-show-modal');
        closeButton.addEventListener('click', () => {
          placeholderModal.classList.remove('placeholder-show-modal');
          window.location = './admin-dashboard.html';
        })
      }
      if (data) {
        const { accountnumber, balance, status, type, owneremail } = data[0];
        email.textContent = `${owneremail}`;
        accountNumber.textContent = `${accountnumber}`;
        accountBalance.textContent = `$${balance}`;
        accountType.textContent = `${type}`;
        accountStatus.textContent = `${status}`;
      }
    });
  fetch(`${defaultUrl}/accounts/${accNum}/transactions`, adminDashboardConfig)
    .then(res => res.json())
    .then((res) => {
      const { error, data } = res;
      if (error) {
        transactionError.textContent = error;
        transactionError.style.color = 'red';
      }
      if (data.length === 0) {
        transactionBox.style.display = 'none';
        transactionError.textContent = 'This Account has no transaction History';
        transactionError.style.color = 'red';
      }
      if (data) {
        let output = '';
        data.forEach((trans) => {
          output += `
        <div class="table-row2" id="transactionTable">
      <div class="table-content">${trans.accountnumber}</div>
      <div class="table-content">${trans.type}</div>
      <div class="table-content">$${trans.oldbalance}</div>
      <div class="table-content">$${trans.newbalance}</div>
      <div class="table-content">$${trans.amount}</div>
      </div>
      `;
        });
        transactionBox.innerHTML += output;
      }
    });
};

activate.addEventListener('click', () => {
  const form = {};

  form.status = 'active';

  const activateAccountConfig = {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: staffUserToken,
    },
    body: JSON.stringify(form),
  };

  fetch(`${defaultUrl}/accounts/${accNum}`, activateAccountConfig)
    .then(res => res.json())
    .then((res) => {
      const { error, data } = res;
      if (error) {
        modalDisplay.innerHTML = error;
        modalDisplay.style.color = 'red';
        placeholderModal.classList.add('placeholder-show-modal');
        closeButton.addEventListener('click', () => {
          placeholderModal.classList.remove('placeholder-show-modal');
        });
      }
      if (data) {
        modalDisplay.innerHTML = 'Account Activated Successfully';
        modalDisplay.style.color = 'green';
        accountStatus.textContent = `${data.status}`;
        placeholderModal.classList.add('placeholder-show-modal');
        closeButton.addEventListener('click', () => {
          placeholderModal.classList.remove('placeholder-show-modal');
        });
      }
    });
});

deactivate.addEventListener('click', () => {
  const form = {};

  form.status = 'dormant';

  const activateAccountConfig = {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: staffUserToken,
    },
    body: JSON.stringify(form),
  };

  fetch(`${defaultUrl}/accounts/${accNum}`, activateAccountConfig)
    .then(res => res.json())
    .then((res) => {
      const { error, data } = res;
      if (error) {
        modalDisplay.innerHTML = error;
        modalDisplay.style.color = 'red';
        placeholderModal.classList.add('placeholder-show-modal');
        closeButton.addEventListener('click', () => {
          placeholderModal.classList.remove('placeholder-show-modal');
        });
      }
      if (data) {
        modalDisplay.innerHTML = 'Account Deactivated Successfully';
        modalDisplay.style.color = 'green';
        accountStatus.textContent = `${data.status}`;
        placeholderModal.classList.add('placeholder-show-modal');
        closeButton.addEventListener('click', () => {
          placeholderModal.classList.remove('placeholder-show-modal');
        });
      }
    });
});

deleteAccount.addEventListener('click', () => {

  const deleteAccountConfig = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: staffUserToken,
    },
  };
  fetch(`${defaultUrl}/accounts/${accNum}`, deleteAccountConfig)
    .then(res => res.json())
    .then((res) => {
      const { error } = res;
      if (error) {
        modalDisplay.innerHTML = error;
        modalDisplay.style.color = 'red';
        placeholderModal.classList.add('placeholder-show-modal');
        closeButton.addEventListener('click', () => {
          placeholderModal.classList.remove('placeholder-show-modal');
        });
      } else {
        modalDisplay.innerHTML = 'Account Deleted Successfully';
        modalDisplay.style.color = 'green';
        placeholderModal.classList.add('placeholder-show-modal');
        closeButton.addEventListener('click', () => {
          placeholderModal.classList.remove('placeholder-show-modal');
          window.location = './admin-dashboard.html';
        });
      }
    });
});

credit.addEventListener('click', () => {
  transactionModal.classList.add('placeholder-show-modal');

  transaction.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = {};

    if (transactionAmount.value) {
      form.amount = transactionAmount.value;
    }
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: staffUserToken,
      },
      body: JSON.stringify(form),
    };

    fetch(`${defaultUrl}/transactions/${accNum}/credit`, config)
      .then(res => res.json())
      .then((res) => {
        const { error, data } = res;
        if (error) {
          transactionModal.classList.remove('placeholder-show-modal');
          modalDisplay.innerHTML = error;
          modalDisplay.style.color = 'red';
          placeholderModal.classList.add('placeholder-show-modal');
          closeButton.addEventListener('click', () => {
            placeholderModal.classList.remove('placeholder-show-modal');
          });
        }
        if (data) {
          const  { accountnumber, amount, newbalance, oldbalance, type } = data;
          transactionModal.classList.remove('placeholder-show-modal');
          modalDisplay.innerHTML = 'Credit transaction was Successful';
          modalDisplay.style.color = 'green';
          accountBalance.textContent = `$${newbalance}`;
          let output = '';
          output += `
        <div class="table-row2" id="transactionTable">
        <div class="table-content">${accountnumber}</div>
        <div class="table-content">${type}</div>
        <div class="table-content">$${oldbalance}</div>
        <div class="table-content">$${newbalance}</div>
        <div class="table-content">$${amount}</div>
        </div>
        `;
          transactionBox.innerHTML += output;
          placeholderModal.classList.add('placeholder-show-modal');
          closeButton.addEventListener('click', () => {
            placeholderModal.classList.remove('placeholder-show-modal');
          });
        }
      })
      .catch(error => error);
  });
  closeButtonTransaction.addEventListener('click', () => {
    transactionModal.classList.remove('placeholder-show-modal');
  });
});


debit.addEventListener('click', () => {
  transactionModal.classList.add('placeholder-show-modal');

  transaction.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = {};

    if (transactionAmount.value) {
      form.amount = transactionAmount.value;
    }
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: staffUserToken,
      },
      body: JSON.stringify(form),
    };

    fetch(`${defaultUrl}/transactions/${accNum}/debit`, config)
      .then(res => res.json())
      .then((res) => {
        const { error, data } = res;
        if (error) {
          transactionModal.classList.remove('placeholder-show-modal');
          modalDisplay.innerHTML = error;
          modalDisplay.style.color = 'red';
          placeholderModal.classList.add('placeholder-show-modal');
          closeButton.addEventListener('click', () => {
            placeholderModal.classList.remove('placeholder-show-modal');
          });
        }
        if (data) {
          const  { accountnumber, amount, newbalance, oldbalance, type } = data;
          transactionModal.classList.remove('placeholder-show-modal');
          modalDisplay.innerHTML = 'Debit transaction was Successful';
          modalDisplay.style.color = 'green';
          accountBalance.textContent = `$${newbalance}`;
          let output = '';
          output += `
        <div class="table-row2" id="transactionTable">
        <div class="table-content">${accountnumber}</div>
        <div class="table-content">${type}</div>
        <div class="table-content">$${oldbalance}</div>
        <div class="table-content">$${newbalance}</div>
        <div class="table-content">$${amount}</div>
        </div>
        `;
          transactionBox.innerHTML += output;
          placeholderModal.classList.add('placeholder-show-modal');
          closeButton.addEventListener('click', () => {
            placeholderModal.classList.remove('placeholder-show-modal');
          });
        }
      })
      .catch(error => error);
  });
  closeButtonTransaction.addEventListener('click', () => {
    transactionModal.classList.remove('placeholder-show-modal');
  });
});
