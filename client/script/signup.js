const signUpForm = document.getElementById('signUpUser');
const firstName = document.getElementById('fname');
const lastName = document.getElementById('lname');
const signUpEmail = document.getElementById('email');
const signUpPassword = document.getElementById('password');
const spanError = document.getElementById('errorHandler');


const defaultUrl = 'https://crestfinance.herokuapp.com/api/v1';

signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = {};

  if (firstName.value) {
    form.firstName = firstName.value;
  }
  if (lastName.value) {
    form.lastName = lastName.value;
  }
  if (signUpEmail.value) {
    form.email = signUpEmail.value;
  }
  if (signUpPassword.value) {
    form.password = signUpPassword.value;
  }

  const config = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  };

  fetch(`${defaultUrl}/auth/signup`, config)
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
        console.log(bankaUserEmail);
        
        localStorage.bankaUserfirstName = JSON.stringify(firstName);
        localStorage.bankaUserlastName = JSON.stringify(lastName);
        localStorage.bankaUserToken = `bearer ${token}`;
        window.location = './user-dashboard.html';
      }
    })
    .catch(error => error);
});
