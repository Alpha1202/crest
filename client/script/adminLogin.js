/* eslint-disable no-undef */
const adminLoginForm = document.getElementById('adminLoginForm');
const logInEmail = document.getElementById('email');
const logInPassword = document.getElementById('password');
const spanError = document.getElementById('errorHandler');

const defaultUrl = 'https://crestfinance.herokuapp.com/api/v1';

adminLoginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = {};

  if (logInEmail.value) {
    form.email = logInEmail.value;
  }
  if (logInPassword.value) {
    form.password = logInPassword.value;
  }

  const config = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  };

  fetch(`${defaultUrl}/users/signin`, config)
    .then(res => res.json())
    .then((res) => {
      const { error, data } = res;
      if (error) {
        spanError.innerHTML = error;
        spanError.style.color = 'red';
      }
      if (data) {
        console.log(data);
        const { email, firstName, lastName, token, type } = data;
        localStorage.staffUserEmail = email;
        localStorage.staffUserfirstName = JSON.stringify(firstName);
        localStorage.staffUserlastName = JSON.stringify(lastName);
        localStorage.staffUserToken = `bearer ${token}`;
        if ( type === 'cashier') {
          return window.location = './cashier-dashboard.html';
        }
        window.location = './admin-dashboard.html';
      }
    })
    .catch(error => error);
});
