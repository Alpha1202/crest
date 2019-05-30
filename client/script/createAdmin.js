const newStaffForm = document.getElementById('createStaff');
const firstName = document.getElementById('fname');
const lastName = document.getElementById('lname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const type = document.getElementById('type');
const spanError = document.getElementById('errorHandler');


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
newStaffForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = {};

  if (firstName.value) {
    form.firstName = firstName.value;
  }
  if (lastName.value) {
    form.lastName = lastName.value;
  }
  if (email.value) {
    form.email = email.value;
  }
  if (password.value) {
    form.password = password.value;
  }
  if (type.value) {
    form.type = type.value;
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

  fetch(`${defaultUrl}/users`, config)
    .then(res => res.json())
    .then((res) => {
      const { error, data } = res;
      if (error) {
        spanError.innerHTML = error;
        spanError.style.color = 'red';
      }
      if (data) {
        console.log(data);

        const { email, firstName, lastName, token } = data;
        localStorage.staffUserEmail = email;
        localStorage.staffUserfirstName = JSON.stringify(firstName);
        localStorage.staffUserlastName = JSON.stringify(lastName);
        localStorage.staffUserToken = `bearer ${token}`;
        spanError.innerHTML = 'New Staff Created Successfully';
        spanError.style.color = 'green';
        window.location = './admin-dashboard.html';
      }
    })
    .catch(error => error);
});
