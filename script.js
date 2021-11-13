'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
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
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


let currentAccount;

const displayMovements = function(movements){
    containerMovements.innerHTML = '';
    movements.forEach(function(mov, i){
      const type = mov > 0 ? 'deposit' : 'withdrawal';
      
      const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">€${mov}</div>
      </div>
      `;
  
    containerMovements.insertAdjacentHTML('afterbegin', html);
    })
}


const createUserNames = function(accs){
accs.forEach(function(acc,i){
   acc.username = acc.owner.toLowerCase().split(' ').map(function(n){
    return n[0]
   }).join('');
});
};

createUserNames(accounts);

const calcDisplayBalance = function(movements){
  const balance = movements.reduce(function(accum, m){
    return accum + m;
  } ,0);
  labelBalance.textContent = `${balance} €`;
}

const calcDisplaySummary = function(movements){
  const incomes = movements.filter(m => m > 0).reduce((accum, d) => accum + d, 0);
  labelSumIn.textContent = `${incomes}€`;
  const outcomes = movements.filter(m => m < 0).reduce((accum, d) => accum + d, 0);
  labelSumOut.textContent = `${outcomes * -1}€`;

}

const displayAll = function(){
    displayMovements(currentAccount.movements);
    calcDisplayBalance(currentAccount.movements);
    calcDisplaySummary(currentAccount.movements);
}





btnLogin.addEventListener('click', function(){
  currentAccount =  accounts.find(a => a.username === inputLoginUsername.value);
  if(Number(inputLoginPin.value) === currentAccount.pin ){
    displayAll();
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner}`;
    containerApp.style.opacity = '1';
    inputLoginUsername.value = inputLoginPin.value = '';
  }

});

btnTransfer.addEventListener('click', function(){
  const transferredAccount = accounts.find(a => a.username === inputTransferTo.value);
  currentAccount.movements.push(Number(inputTransferAmount.value) * -1);
  transferredAccount.movements.push(Number(inputTransferAmount.value));
  displayAll();
  inputTransferAmount.value = inputTransferTo.value = '';
});

btnLoan.addEventListener('click', function(){
   if(currentAccount.movements.some(m => m >= 1000)){
    currentAccount.movements.push(Number(inputLoanAmount.value));
    displayAll();
    inputLoanAmount.value ='';
   } else {
     alert(`Sorry, you should have at least 1000 euros on deposite`)
   }
  
});

btnClose.addEventListener('click', function(){
   let accountToDelete = accounts.find(a => a.username === inputCloseUsername.value);
   let indexToDelete = accounts.findIndex(a => accountToDelete); 
   if(accountToDelete.pin === Number(inputClosePin.value)){
    accounts.splice(indexToDelete, 1);
    alert(`Account of ${accountToDelete.owner} has succesfully deleted`);
    containerApp.style.opacity = '0';
    inputCloseUsername.value = inputClosePin.value ='';
    labelWelcome.textContent = `Please login`;
   } else {
    alert(`Enter proper username and pin`);
    inputCloseUsername.value = inputClosePin.value ='';
   }
   
   
});

const anyDeposits = account3.movements.some(m => m > 0);
console.log(anyDeposits);

// const deposits = account1.movements.filter(function(m){
//    return m > 0;
// })


// const withdrawals = account1.movements.filter(function(m){
//   return m < 0;
// })


// const balance = account1.movements.reduce(function(accum, m, i, arr){
//      return accum + m;
// }, 0);

// const balance = account1.movements.reduce((acc, m) => acc + m ,0)

// console.log(account1.movements);
// console.log(withdrawals);
// console.log(balance);

// const maximumValue = account1.movements.reduce(function(startMax, m){
//     if(m > startMax){
//        return m;
//     } else {
//       return startMax;
//     }
// } ,account1.movements[0]);

// const myArr = [1, 2, 500, 1000, -200];
// console.log(myArr);
// const myArrMin = myArr.reduce( function(accum, number, i){
//   console.log(`Loop ${i}: Accum = ${accum}`);
//   if(accum < number){
//    return accum;
   
//   } else {
//     return number;
    
//   };
  
// },myArr[0]);

// console.log(myArrMin);
// console.log(account1.movements);

// const dogs = [5, 2, 4, 1, 15, 8, 3];

// const calcAverageHumanAge = function(dogsAges){
//   const dogsToHuman = dogsAges.map(function(a){
//       if(a <= 2){
//         return a * 2;
//       } else {
//         return 16 + a * 4;
//       }
//   });
//   console.log(`Dogs array: ${dogs}`);
//   console.log(`DogsToHuman array: ${dogsToHuman}`);

//   const filteredHuman = dogsToHuman.filter(function(age){
//     return age > 18;
//   })
//   console.log(`filteredAges array: ${filteredHuman}`);

//   const humanAverage = filteredHuman.reduce(function(accum, age ){
//         return accum + age;
//   }, 0)/filteredHuman.length;

//   console.log(humanAverage);
// };

// calcAverageHumanAge(dogs);
//deposits from euro to usd and sum

const usdDeposits = account1.movements
.filter(m => m > 0)
.map(m => m * 1.1)
.reduce((accum, d) => accum + d, 0);

console.log(usdDeposits);

const movements = account1.movements;
const firstWithdrawal = movements.find(m => m < 0);
console.log(firstWithdrawal);

const accountFound = accounts.find(a => a.username === 'js');
console.log(accountFound);


