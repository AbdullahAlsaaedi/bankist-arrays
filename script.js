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

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    let html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">3 days ago</div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// displayMovements(account1.movements);

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov);
  labelBalance.textContent = account.balance + '€';
};
// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (account) {
  const incomes = account.movements.reduce((acc, mov) => {
    return mov > 0 ? acc + mov : acc;
  }, 0);

  const outcomes = account.movements.reduce((acc, mov) => {
    return mov < 0 ? acc + mov : acc;
  }, 0);

  const interest = account.movements.reduce((acc, mov) => {
    if (mov > 0) {
      return (mov * account.interestRate) / 100 >= 1
        ? (mov * account.interestRate) / 100 + acc
        : acc;
    } else return acc;
  }, 0);

  labelSumIn.textContent = incomes + '€';
  labelSumOut.textContent = Math.abs(outcomes) + '€';
  labelSumInterest.textContent = interest + '€';
};
// calcDisplaySummary(account1.movements);

const createUsernames = function (accounts) {
  accounts.forEach(account => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(currname => currname[0])
      .join('');
  });

  console.log(accounts);
};

createUsernames(accounts);

const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  // get the value from input user/password
  const pin = Number(inputLoginPin.value);
  const username = inputLoginUsername.value;

  // find the correspondding user with the pin
  currentAccount = accounts.find(acc => acc.username === username);
  // update UI based on the object we found

  // console.log(account);
  if (currentAccount?.pin === pin) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();

  if (
    recieverAcc &&
    amount > 0 &&
    currentAccount.balance >= amount &&
    recieverAcc.username !== currentAccount.username
  ) {
    console.log('Valid!');
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// movements.forEach((movement, i, arr) => {
//   if (movement > 100) {
//     return;
//   } else {
//     console.log('Hey');
//   }
// });

// const mymap = new Map([
//   ['key1', 'value1'],
//   ['key2', 'value2'],
// ]);

// mymap.forEach((value, key, map) => {
//   console.log(value);
// });

// // movements.forEach(())

// const julia = [3, 5, 2, 12, 7];
// const kate = [4, 1, 5, 8, 3];

// const checkDogs = function (julia, kate) {
//   // copy julia
//   const juliaCorrected = [...julia];
//   juliaCorrected.splice(0, 1);
//   juliaCorrected.splice(-2);

//   const juliaAndKate = juliaCorrected.concat(kate);
//   console.log(juliaAndKate);
//   juliaAndKate.forEach((dogAge, i) => {
//     let dogType = dogAge >= 3 ? 'an adult' : 'a puppy';
//     console.log(
//       `Dog number ${i + 1} is ${dogType}, and is ${dogAge} years old`
//     );
//   });
// };

// checkDogs(julia, kate);

// const newArr = movements.map(mov => mov * 1.1);
// console.log(newArr);

// let max = [1, 2, 1, 3, 4, 3, 1, 20, 5, 4].reduce((acc, val) =>
//   val > acc ? val : acc
// );

// console.log(max);

// const test1 = [5, 2, 4, 1, 15, 8, 3];
// const test2 = [16, 6, 10, 5, 6, 1, 4];

// const calHumanAvg = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   const exludeHumanAge = humanAges.filter(age => age >= 18);
//   const averageHumanAge = exludeHumanAge.reduce((acc, age, i, arr) => {
//     acc += age;
//     if (i === arr.length - 1) {
//       return acc / arr.length;
//     } else return acc;
//   });

// const averageHumanAge = ages.reduce((accum, age, i, arr) => {
//   // console.log(age === 15 ? age : 'none');
//   age = age <= 2 ? 2 * age : 16 + age * 2;
//   console.log(arr);
//   if (age >= 18) {
//     console.log('Inside if!');

//     console.log(`Index: ${i}, Value ${age}, Accumm ${accum}`);
//     accum += age;
//     console.log(`New accum is ${accum}`);
//     if (i === arr.length - 1) {
//       return accum + 15 / 5;
//     } else return accum;
//   } else {
//     console.log('Inside else!');
//     console.log(`Index: ${i}, Value ${age}, Accumm ${accum}`);
//     arr.splice(i, 1);
//     return accum;
//   }
// }, 0);

//   console.log(averageHumanAge);
// };

// calHumanAvg(test1);
