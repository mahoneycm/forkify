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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

function calcDisplaySummary(acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = interest;
}

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(currentAccount.movements);

  // Display balance
  calcDisplayBalance(currentAccount);
  // Display summary
  calcDisplaySummary(currentAccount);
};

// Event Handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI & welcome message

    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount?.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }

  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur();
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
  } else {
    console.log(`Error`);
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*

let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice());
console.log([...arr]);

// SPLICE
// console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);
arr.splice(1, 2);
console.log(arr);

// REVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join(' - '));


const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

console.log('jonas'.at(0));
console.log('jonas'.at(-1));


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
  for (const [i, movement] of movements.entries()) {
    if (movement > 0) {
      console.log(`Movement ${i + 1}: You deposited: ${Math.abs(movement)}`);
    } else {
      console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
    }
  }
  
  console.log(`-------- FOR REACH -------`);
  movements.forEach(function (mov, i, arr) {
    if (mov > 0) {
      console.log(`Movement ${i + 1}: You deposited: ${Math.abs(mov)}`);
    } else {
      console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
    }
  });
  
  
  // Map
  const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
  ]);
  
  currencies.forEach(function (value, key, map) {
    console.log(`${key}: ${value}`);
  });
  
  // Set
  const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
  console.log(currenciesUnique);
  currenciesUnique.forEach(function (value, _, map) {
    console.log(`${value}: ${value}`);
  });
  


////////////////////////////////////////////////////
// CODING CHALLENGE #1

function checkDogs(dogsJulia, dogsKate) {
  const juliaFix = dogsJulia.slice(1, -2);
  console.log(dogsJulia, juliaFix);

  const allDogs = juliaFix.concat(dogsKate);
  allDogs.forEach(function (age, i) {
    console.log(
      `Dog number ${i + 1} is ${
        age >= 3 ? `an adult, and is ${age} years old.` : `still a puppy 🐶`
      }`
    );
  });
}

// TEST DATA 1:
const dogsJulia1 = [3, 5, 2, 12, 7];
const dogsKate1 = [4, 1, 15, 8, 3];

checkDogs(dogsJulia1, dogsKate1);

console.log(`----------- TEST DATA 2 ----------`);

// TEST DATA 2:
const dogsJulia2 = [9, 16, 6, 8, 3];
const dogsKate2 = [10, 5, 6, 1, 4];

checkDogs(dogsJulia2, dogsKate2);


Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

const eurToUsd = 1.1;

const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

const movementsDesc = movements.map(
  (mov, i) =>
  `Movement ${i + 1}: You ${mov > 0 ? `deposited` : `withdrew`}: ${Math.abs(
    mov
    )}`
);
    
console.log(movementsDesc);


const deposits = movements.filter(mov => mov > 0);
const withdrawals = movements.filter(mov => mov < 0);

console.log(deposits);
console.log(withdrawals);


console.log(movements);

// accumulator -> SNOWBALL
const balance = movements.reduce((acc, cur) => acc + cur, 0);

console.log(balance);

// Maximum Value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);

console.log(max);


function calcAverageHumanAge(data) {
  const humanAge = data
  .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
  .filter(age => age >= 18)
  .reduce((val, cur, _, arr) => val + cur / arr.length, 0);
  
  // return Math.trunc(humanAge / data.length);
  return Math.trunc(humanAge);
}

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// Data 1: [5, 2, 4, 1, 15, 8, 3]
// Data 2: [16, 6, 10, 5, 6, 1, 4]
    

const eurToUsd = 1.1;

// PIPELINE
const totalDepositsUSD = movements
.filter(mov => mov > 0)
.map(mov => mov * eurToUsd)
.reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);


const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

for (const account of accounts) {
  if (account.owner === 'Jessica Davis') {
    console.log(account);
  }
}


console.log(movements);

// Equality
console.log(movements.includes(-130));

// Condition
console.log(movements.some(mov => mov === -130));
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// EVERY
console.log(account4.movements.every(mov => mov > 0));

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));


const arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(arr.flat());

const arrDeep = [
  [[1, 2], 3],
  [4, [5, 6]],
  [7, 8, 9],
];

console.log(arrDeep.flat(2));

// flat
const overallBalance = accounts
.map(acc => acc.movements)
.flat()
.reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// flatMap

const overallBalance2 = accounts
.flatMap(acc => acc.movements)
.reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);


const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

// Numbers
console.log(movements);

// return < 0: a, b (keep order)
// return > 0: b, a (switch order)

// Ascending
// movements.sort((a, b) => {
  //   if (a > b) return 1;
  //   if (b > a) return -1;
  // });
  
  movements.sort((a, b) => a - b);
  console.log(movements);
  
  // Descending
  // movements.sort((a, b) => {
    //   if (a > b) return -1;
    //   if (b > a) return 1;
    // });
    
    movements.sort((a, b) => b - a);
    console.log(movements);
    
    const arr = [1, 2, 3, 4, 5, 6, 7];
    
    // Empty arrays + fill method
    const x = new Array(7);
    console.log(x);
    
    x.fill(1);
    x.fill(1, 3, 5);
    
    console.log(x);
    
    arr.fill(23, 2, 6);
    console.log(arr);
    
    // Array.from
    const y = Array.from({ length: 7 }, () => 1);
    console.log(y);
    
    const z = Array.from({ length: 7 }, (_, i) => i + 1);
    console.log(z);
    
    const dice = Array.from(
      { length: 100 },
      () => Math.floor(Math.random() * 6) + 1
      );
      console.log(dice);
      
      labelBalance.addEventListener('click', function () {
        const movementsUI = Array.from(
          document.querySelectorAll('.movements__value'),
          el => Number(el.textContent.replace('€', ''))
          );
          console.log(movementsUI);
        });
        
        
        //////////////////////////////////////////////////////
        // Array Methods Practice
        
        // 1.
        const bankDepositSum = accounts
        .flatMap(acc => acc.movements)
        .filter(mov => mov > 0)
        .reduce((sum, cur) => sum + cur, 0);
        
        console.log(bankDepositSum);
        // 2.
        const numDeposits1000 = accounts
        .flatMap(acc => acc.movements)
        .filter(mov => mov >= 1000).length;
        
        const numDeposits1000too = accounts
        .flatMap(acc => acc.movements)
        .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
        
        console.log(numDeposits1000);
        console.log(numDeposits1000);
        
        // 3.
        const { deposits, withdrawals } = accounts
        .flatMap(acc => acc.movements)
        .reduce(
          (sums, cur) => {
            // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
            sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
            return sums;
          },
          { deposits: 0, withdrawals: 0 }
          );
          
          console.log(deposits, withdrawals);
          
          // 4.
          // This is a nice title -> This Is a Nice Title
          
          const convertTitleCase = function (title) {
            const capitalize = str => str[0].toUpperCase() + str.slice(1);
            
            const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];
            
            const titleCase = title
            .toLowerCase()
            .split(' ')
            .map(word =>
              exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
              )
              .join(' ');
              return capitalize(titleCase);
            };
            console.log(convertTitleCase('this is a nice title'));
            console.log(convertTitleCase('this is a LONG title but not too long'));
            console.log(convertTitleCase('the labyrinth'));
            console.log(convertTitleCase('fight club'));
            
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// function recPortion(dog) {
//   if (dog.curFood <= 1.1 * dog.recFood && dog.curFood >= 0.9 * dog.recFood) {
//     return true;
//   } else {
//     return false;
//   }
// }

const recPortion = dog =>
  dog.curFood <= 1.1 * dog.recFood && dog.curFood >= 0.9 * dog.recFood
    ? true
    : false;

const recPortionCheck = function (dog) {
  if (dog.curFood > 1.1 * dog.recFood) {
    console.log('Overeating');
    return 'Overeating';
  } else if (dog.curFood < 0.9 * dog.recFood) {
    return 'Undereating';
  } else {
    return 'Just right!';
  }
};

// 1.
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log('1: ', dogs);

// 2.
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log('2: ', recPortionCheck(dogSarah));

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > 1.1 * dog.recFood)
  .flatMap(dog => (dog.owners = dog.owners).concat());
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < 0.9 * dog.recFood)
  .flatMap(dog => (dog.owners = dog.owners).concat());

console.log('3:', ownersEatTooMuch, ownersEatTooLittle);

console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

console.log(dogs.some(dog => dog.curFood === dog.recFood));
console.log(dogs.find(dog => dog.curFood === dog.recFood) ? true : false);
console.log(
  dogs.some(
    dog => dog.curfood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1
  )
);
console.log(dogs.find(dog => dog.curFood === recPortion(dog)) ? true : false);

const dogsOK = dogs.filter(dog => dog.curFood === recPortion(dog));
console.log(dogsOK);

const dogsSort = dogs.map(dogs => dogs).sort((a, b) => a.recFood - b.recFood);

console.log(dogsSort);
