'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Diyaz Mukhanov',
  movements: [],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Ayazhan Kuanysheva',
  movements: [],
  interestRate: 1.5,
  pin: 2222,
  
};

const account3 = {
  owner: 'Bolat Kuanyshev',
  movements: [],
  interestRate: 0.7,
  pin: 3333,
  
};

const account4 = {
  owner: 'Gulnara Kuanysheva',
  movements: [],
  interestRate: 1,
  pin: 4444,
  
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');


const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
// const inputCloseUsername = document.querySelector('.form__input--user');
// const inputClosePin = document.querySelector('.form__input--pin');

/* Date logic */

const d = new Date();
const dateStr = d.toLocaleString();
console.log(dateStr);

labelDate.textContent = dateStr;

/* End of Date logic */



/* Login logic */
  let balance;
  
  const shortNameCreator = function(accountIndex){
  const acNameArr = accounts[accountIndex].owner.split(' ');
  const shortName = `${acNameArr[0][0].toLowerCase()}${acNameArr[1][0].toLowerCase()}`;
  return shortName;
  }

  const shortNamesArr = [];
  for(let i = 0; i < accounts.length; i++){
    shortNamesArr.push(shortNameCreator(i));
  }
  
  const removeMovements = function(){
    const movementsRowToDelete = document.querySelectorAll('.movements__row');
    for(let i = 0; i < movementsRowToDelete.length; i++){
      movementsRowToDelete[i].remove();
    }
    }
  

  const balanceShow = function(){
    balance = 0;
    for (let i = 0; i < accounts[shortNamesArr.indexOf(inputLoginUsername.value)].movements.length; i++){
      balance = balance + accounts[shortNamesArr.indexOf(inputLoginUsername.value)].movements[i];
  }
     
     labelBalance.textContent = `${balance}€`;
  }

const makeInputsEmpty = function(){
  inputTransferAmount.value = '';
  inputTransferTo.value = '';
  inputLoanAmount.value = '';
}

  const loginUser = function(){
      if(shortNamesArr.includes(inputLoginUsername.value) && Number(inputLoginPin.value) === accounts[shortNamesArr.indexOf(inputLoginUsername.value)].pin) {
          console.log(`The user ${accounts[shortNamesArr.indexOf(inputLoginUsername.value)].owner} has logged in`);
          labelWelcome.textContent = `Welcome, ${accounts[shortNamesArr.indexOf(inputLoginUsername.value)].owner}`;
          containerApp.style.opacity = '1';
          console.log(accounts[shortNamesArr.indexOf(inputLoginUsername.value)].pin);
          balanceShow();
          removeMovements();
          displayAllMovements();
          console.log(accounts[shortNamesArr.indexOf(inputLoginUsername.value)].movements);
          makeInputsEmpty();
      } else {
        alert(`user or pin is wrong`);
      }
      // console.log(accounts[shortNamesArr.indexOf(inputLoginUsername.value)].movements.length);
  }
  
  
  btnLogin.addEventListener('click', loginUser);

//Movements logic

//For displaying after login only
const createDepositeMovement = function(indexOfMovements){
  
  const movementRow = document.createElement('div');
  const firstChild = containerMovements.firstChild;
  containerMovements.insertBefore(movementRow, firstChild);
  movementRow.classList.add('movements__row');
  const movementDeposite = document.createElement('div');
  const movementDate = document.createElement('div');
  const movementValue = document.createElement('div');
  movementRow.appendChild(movementDeposite);
  movementRow.appendChild(movementDate);
  movementRow.appendChild(movementValue);
  movementDeposite.classList.add('movements__type', 'movements__type--deposit');
  movementDate.classList.add('movements__date');
  movementValue.classList.add('movements__value');
  movementDeposite.textContent = `${indexOfMovements + 1} DEPOSIT`;
  movementDate.textContent = `${dateStr}`;
  movementValue.textContent = `${accounts[shortNamesArr.indexOf(inputLoginUsername.value)].movements[indexOfMovements]}€`;
};

//For displaying after login only
const createWithdrawalMovement = function(indexOfMovements){
  
  const movementRow = document.createElement('div');
  const firstChild = containerMovements.firstChild;
  containerMovements.insertBefore(movementRow, firstChild);
  movementRow.classList.add('movements__row');
  const movementWithdrawal = document.createElement('div');
  const movementDate = document.createElement('div');
  const movementValue = document.createElement('div');
  movementRow.appendChild(movementWithdrawal);
  movementRow.appendChild(movementDate);
  movementRow.appendChild(movementValue);
  movementWithdrawal.classList.add('movements__type', 'movements__type--withdrawal');
  movementDate.classList.add('movements__date');
  movementValue.classList.add('movements__value');
  movementWithdrawal.textContent = `${indexOfMovements + 1} withdrawal`;
  movementDate.textContent = `${dateStr}`;
  movementValue.textContent = `${accounts[shortNamesArr.indexOf(inputLoginUsername.value)].movements[indexOfMovements]}€`;
  
}

const moneyTransferDisplay = function(){
  const movementRow = document.createElement('div');
  const firstChild = containerMovements.firstChild;
  containerMovements.insertBefore(movementRow, firstChild);
  movementRow.classList.add('movements__row');
  const movementDeposite = document.createElement('div');
  const movementDate = document.createElement('div');
  const movementValue = document.createElement('div');
  movementRow.appendChild(movementDeposite);
  movementRow.appendChild(movementDate);
  movementRow.appendChild(movementValue);
  movementDeposite.classList.add('movements__type', 'movements__type--withdrawal');
  movementDate.classList.add('movements__date');
  movementValue.classList.add('movements__value');
  movementDeposite.textContent = `${accounts[shortNamesArr.indexOf(inputLoginUsername.value)].movements.length} withdrawal`;
  movementDate.textContent = `${dateStr}`;
  movementValue.textContent = `${accounts[shortNamesArr.indexOf(inputLoginUsername.value)].movements.slice(-1)}€`;
}

const moneyLoanDisplay = function(){
  const movementRow = document.createElement('div');
  const firstChild = containerMovements.firstChild;
  containerMovements.insertBefore(movementRow, firstChild);
  movementRow.classList.add('movements__row');
  const movementDeposite = document.createElement('div');
  const movementDate = document.createElement('div');
  const movementValue = document.createElement('div');
  movementRow.appendChild(movementDeposite);
  movementRow.appendChild(movementDate);
  movementRow.appendChild(movementValue);
  movementDeposite.classList.add('movements__type', 'movements__type--deposit');
  movementDate.classList.add('movements__date');
  movementValue.classList.add('movements__value');
  movementDeposite.textContent = `${accounts[shortNamesArr.indexOf(inputLoginUsername.value)].movements.length} DEPOSIT`;
  movementDate.textContent = `${dateStr}`;
  movementValue.textContent = `${accounts[shortNamesArr.indexOf(inputLoginUsername.value)].movements.slice(-1)}€`;
}


// Request loan logic
const loanFunction = function(){
accounts[shortNamesArr.indexOf(inputLoginUsername.value)].movements.push(Number(inputLoanAmount.value));
balanceShow();
moneyLoanDisplay();
}

btnLoan.addEventListener('click', loanFunction);

//Transfer logic
const transferMoney = function(){
  accounts[shortNamesArr.indexOf(inputTransferTo.value)].movements.push(Number(inputTransferAmount.value));
  accounts[shortNamesArr.indexOf(inputLoginUsername.value)].movements.push(Number(inputTransferAmount.value) *-1);
  console.log(`The amount of money for ${accounts[shortNamesArr.indexOf(inputTransferTo.value)].owner} is ${accounts[shortNamesArr.indexOf(inputTransferTo.value)].movements}`);
  console.log(`The amount of money for ${accounts[shortNamesArr.indexOf(inputLoginUsername.value)].owner} is ${accounts[shortNamesArr.indexOf(inputLoginUsername.value)].movements}`);
  balanceShow();
  moneyTransferDisplay();
  // createWithdrawalMovement();
}


const displayAllMovements = function(){
  for (let i = 0; i < accounts[shortNamesArr.indexOf(inputLoginUsername.value)].movements.length; i++) {
      if(accounts[shortNamesArr.indexOf(inputLoginUsername.value)].movements[i] > 0){
         createDepositeMovement(i);
      } else {
         createWithdrawalMovement(i);
      }
  }
}

btnTransfer.addEventListener('click', transferMoney);


// [shortNamesArr.indexOf(inputLoginUsername.value)]
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);



// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// console.log(`works`);
// const arr2 = ['f', 'g', 'h', 'i', 'j'];
// const arr = ['a', 'b', 'c', 'd', 'e'];

// console.log(arr.concat(arr2).join(' - '));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
//   movement > 0 ? console.log(`Profit: ${movement}`) : console.log(`Fail: ${movement}`);
//   }

// console.log(`---FOREACH---`);
//   // movements.forEach(function(m, i, array){
//   //   m > 0 ? console.log(`Movement ${i}: Profit: ${m}`) : console.log(`Movement ${i}:Fail: ${Math.abs(m)}`);
//   // })

//   movements.forEach(function(m, i, arr){
//        if( m > 0 ){
//          console.log(`Movement ${i}: Profit: ${m}`);
//        } else {
//          console.log(`Movement ${i}: No profit`);
//        }
//   });

//   console.log(`--- For let i ---`);

//   for (let i = 0; i < movements.length; i ++) {
//     movements[i] > 0 ? console.log(`Movement ${i}: Profit ${movements[i]}`) : console.log(`Movement ${i}: no profit`);
//   }

// toString gives you Wed Jan 23 2019 17:23:42 GMT+0800 (Singapore Standard Time)
// toDateString gives you Wed Jan 23 2019
// toLocaleString gives you 23/01/2019, 17:23:42
// toLocaleDateString gives you 23/01/2019
// toGMTString gives you Wed, 23 Jan 2019 09:23:42 GMT
// toUTCString gives you Wed, 23 Jan 2019 09:23:42 GMT
// toISOString gives you 2019-01-23T09:23:42.079Z