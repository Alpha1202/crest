const allAccounts = document.getElementById('allAccounts');
const accountTable = document.getElementById('accountTable');
const activeAcc = document.getElementById('activeAcc');
const allActiveAccounts = document.getElementById('allActiveAccounts');
const allAcc = document.getElementById('allAcc');
const deactiveAcc = document.getElementById('deactiveAcc');
const alldeactiveAccounts = document.getElementById('alldeactiveAccounts');
const navAcc = document.getElementById('nav-acc');
const navActive = document.getElementById('nav-active');
const navDormant = document.getElementById('nav-dormant');
const createAdmin = document.getElementById('createAdmin');
// let accDetails;

createAdmin.addEventListener('click', () => {
  window.location = './createAdmin.html';
});

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

window.onload = () => {
  fetch(`${defaultUrl}/accounts`, adminDashboardConfig)
    .then(res => res.json())
    .then((res) => {
      const { error, data } = res;
      if (error) {
        console.log(error);
      }
      if (data) {
        allAccounts.textContent = data.length;
        let output = '';
        data.forEach((account) => {
          output += `
          <div>
          <div class="table-row2" id="getAccountDetails" data-href="#">
          <div class="table-content" onclick="testJS('${account.accountnumber}'
          )"><a href="#">${account.accountnumber}</a></div>
          <div class="table-content"><a href="#">${account.owneremail}</a></div>
          <div class="table-content"><a href="#">$${account.balance}</a></div>
          <div class="table-content"><a href="#">${account.status}</a></div>
          <div class="table-content"><a href="#">${account.type}</a></div>
          </div>
          `;
        });
        accountTable.innerHTML += output;
      }
    });
};
function testJS(acc) {
  const url = `./singleuser.html?${ encodeURIComponent(acc.toString())}`;
  // console.log(url);
  
  document.location.href = url;
  //  fetch(`${defaultUrl}/accounts/${acc}`, adminDashboardConfig)
  //   .then(resp => resp.json())
  //   .then((resp) => {
  //     console.log(resp);
  //   });
}
// const accountNumber = window.location.href.slice(
//   window.location.href.indexOf("?") + 1
// );
// const getAccountDetails = () => {
//   fetch(`${defaultUrl}/accounts/${accDetails}`, adminDashboardConfig)
//     .then(resp => resp.json())
//     .then((resp) => {
//       console.log(resp);
//     });
// };
// const accountDetails =  document.getElementById('getAccountDetails');
// accountDetails.addEventListener('click', getAccountDetails());

allAcc.addEventListener('click', () => {
  fetch(`${defaultUrl}/accounts`, adminDashboardConfig)
    .then(res => res.json())
    .then((res) => {
      const { error, data } = res;
      if (error) {
        console.log(error);
      }
      if (data) {
        allAccounts.textContent = data.length;
        let output = '';
        data.forEach((account) => {
          output += `
          <div>
          <div class="table-row2" data-href="./singleuser.html">
          <div class="table-content"><a href="./singleuser.html">${account.accountnumber}</a></div>
          <div class="table-content"><a href="./singleuser.html">${account.owneremail}</a></div>
         
          <div class="table-content"><a href="./singleuser.html">$${account.balance}</a> </div>
          <div class="table-content"><a href="./singleuser.html">${account.status}</a> </div>
          <div class="table-content"><a href="./singleuser.html">${account.type}</a> </div>
        </div>
          `;
        });
        accountTable.innerHTML += output;
      }
    });
});

navAcc.addEventListener('click', () => {
  fetch(`${defaultUrl}/accounts`, adminDashboardConfig)
    .then(res => res.json())
    .then((res) => {
      const { error, data } = res;
      if (error) {
        console.log(error);
      }
      if (data) {
        allAccounts.textContent = data.length;
        let output = '';
        data.forEach((account) => {
          output += `
          <div>
          <div class="table-row2" data-href="./singleuser.html">
          <div class="table-content"><a href="./singleuser.html">${account.accountnumber}</a></div>
          <div class="table-content"><a href="./singleuser.html">${account.owneremail}</a></div>
         
          <div class="table-content"><a href="./singleuser.html">$${account.balance}</a> </div>
          <div class="table-content"><a href="./singleuser.html">${account.status}</a> </div>
          <div class="table-content"><a href="./singleuser.html">${account.type}</a> </div>
        </div>
          `;
        });
        accountTable.innerHTML += output;
      }
    });
});

activeAcc.addEventListener('click', () => {
  fetch(`${defaultUrl}/accounts/?status=active`, adminDashboardConfig)
    .then(res => res.json())
    .then((res) => {
      const { error, data } = res;
      if (error) {
        console.log(error);
      }
      if (data) {
        allActiveAccounts.innerHTML = data.length;
        let output = '';
        data.forEach((account) => {
          output += `
          <div>
          <div class="table-row2" data-href="./singleuser.html">
          <div class="table-content"><a href="./singleuser.html">${account.accountnumber}</a></div>
          <div class="table-content"><a href="./singleuser.html">${account.owneremail}</a></div>
          <div class="table-content"><a href="./singleuser.html">$${account.balance}</a> </div>
          <div class="table-content"><a href="./singleuser.html">${account.status}</a> </div>
          <div class="table-content"><a href="./singleuser.html">${account.type}</a> </div>
        </div>
          `;
        });
        accountTable.innerHTML = output;
      }
    });
});

navActive.addEventListener('click', () => {
  fetch(`${defaultUrl}/accounts/?status=active`, adminDashboardConfig)
    .then(res => res.json())
    .then((res) => {
      const { error, data } = res;
      if (error) {
        console.log(error);
      }
      if (data) {
        allActiveAccounts.innerHTML = data.length;
        let output = '';
        data.forEach((account) => {
          output += `
          <div>
          <div class="table-row2" data-href="./singleuser.html">
          <div class="table-content"><a href="./singleuser.html">${account.accountnumber}</a></div>
          <div class="table-content"><a href="./singleuser.html">${account.owneremail}</a></div>
          <div class="table-content"><a href="./singleuser.html">$${account.balance}</a> </div>
          <div class="table-content"><a href="./singleuser.html">${account.status}</a> </div>
          <div class="table-content"><a href="./singleuser.html">${account.type}</a> </div>
        </div>
          </div>
          `;

          console.log(account.accountnumber);
        });
        accountTable.innerHTML = output;
      }
    });
});


deactiveAcc.addEventListener('click', () => {
  fetch(`${defaultUrl}/accounts/?status=dormant`, adminDashboardConfig)
    .then(res => res.json())
    .then((res) => {
      const { error, data } = res;
      if (error) {
        console.log(error);
      }
      if (data) {
        alldeactiveAccounts.innerHTML = data.length;
        let output = '';
        data.forEach((account) => {
          output += `
          <div>
          <div class="table-row2" data-href="./singleuser.html">
          <div class="table-content"><a href="./singleuser.html">${account.accountnumber}</a></div>
          <div class="table-content"><a href="./singleuser.html">${account.owneremail}</a></div>
          <div class="table-content"><a href="./singleuser.html">$${account.balance}</a> </div>
          <div class="table-content"><a href="./singleuser.html">${account.status}</a> </div>
          <div class="table-content"><a href="./singleuser.html">${account.type}</a> </div>
        </div>
          `;
        });
        accountTable.innerHTML = output;
      }
    });
});

navDormant.addEventListener('click', () => {
  fetch(`${defaultUrl}/accounts/?status=dormant`, adminDashboardConfig)
    .then(res => res.json())
    .then((res) => {
      const { error, data } = res;
      if (error) {
        console.log(error);
      }
      if (data) {
        alldeactiveAccounts.innerHTML = data.length;
        let output = '';
        data.forEach((account) => {
          output += `
          <div>
          <div class="table-row2" data-href="./singleuser.html">
          <div class="table-content"><a href="./singleuser.html">${account.accountnumber}</a></div>
          <div class="table-content"><a href="./singleuser.html">${account.owneremail}</a></div>
          <div class="table-content"><a href="./singleuser.html">$${account.balance}</a> </div>
          <div class="table-content"><a href="./singleuser.html">${account.status}</a> </div>
          <div class="table-content"><a href="./singleuser.html">${account.type}</a> </div>
        </div>
          `;
        });
        accountTable.innerHTML = output;
      }
    });
});