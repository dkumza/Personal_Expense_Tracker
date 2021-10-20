const balance = document.getElementById('balance');
const money_in = document.getElementById('income');
const money_out = document.getElementById('expense');
const history = document.getElementById('history');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 }
];

let transactions = dummyTransactions;

// Add expense to History list (DOM):
function addTransaction(transaction) {
  // gets positive or negative sign from input field (id="amount")
  // const getSign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // Creates class based on getSign?? value (if negative = .*-danger, if positive = .*-success)
   if (transaction.amount > 0) {
    item.classList.add('list-group-item','d-flex', 'justify-content-between', 'align-items-center', 'list-group-item-success', 'mb-1', 'py-1');
  } else { item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'list-group-item-danger', 'mb-1', 'py-1');}
    
  item.innerHTML = `${transaction.text} <span>${transaction.amount}<button class="btn bi bi-trash ml-2 px-0 py-0" "onclick="removeTransaction(${
    transaction.id
  })"></button> <button class="btn bi bi-pencil ml-2 px-0 py-0"></button> </span>`;

  history.appendChild(item);
}

// Updates Balance, income and expense fields
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount)
  // console.log(amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
    
  const expense = (amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1)
    .toFixed(2);

  balance.innerText = `${total} €`;
  money_in.innerText = `${income} €`;
  money_out.innerText = `${expense} €`;
}


// Init app
function init() {
  history.innerHTML = '';
  
  transactions.forEach(addTransaction);

  updateValues();
}

init();