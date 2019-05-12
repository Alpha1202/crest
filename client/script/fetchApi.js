/* eslint-disable no-undef */
const logInForm = document.getElementById('signin');
const logInEmail = document.getElementById('email');
const logInPassword = document.getElementById('password');

const currApiEndpoint = 'https://crestfinance.herokuapp.com/api/v1';

logInForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = {};

  if (logInEmail.value) {
    formData.email = logInEmail.value;
  }
  if (logInPassword.value) {
    formData.password = logInPassword.value;
  }

  const fetchConfig = {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  };

  fetch(`${currApiEndpoint}/auth/signin`, fetchConfig)
    .then(resp => resp.json())
    .then((resp) => {
      console.log(resp);
    })
    .catch(err => console.log(err));
});
