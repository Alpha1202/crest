/* eslint-disable no-undef */
const logInForm = document.getElementById('loginUser');
const logInEmail = document.getElementById('email');
const logInPassword = document.getElementById('password');
const spanError = document.getElementById('errorHandler');
const signUp = document.getElementById('signUp');

signUp.addEventListener('click', () => {
  window.location = './signup.html';
})

const defaultUrl = 'https://crestfinance.herokuapp.com/api/v1';

logInForm.addEventListener('submit', (e) => {
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

  fetch(`${defaultUrl}/auth/signin`, config)
    .then(res => res.json())
    .then((res) => {
      const { error, data } = res;
      if (error) {
        spanError.innerHTML = error;
        spanError.style.color = 'red';
      }
      if (data) {
        const { email, firstName, lastName, token } = data;
        localStorage.bankaUserEmail = email;
        localStorage.bankaUserfirstName = JSON.stringify(firstName);
        localStorage.bankaUserlastName = JSON.stringify(lastName);
        localStorage.bankaUserToken = `bearer ${token}`;
        window.location = './user-dashboard.html';
      }
    })
    .catch(error => error);
});
