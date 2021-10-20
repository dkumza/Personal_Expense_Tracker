const balance = document.getElementById('balance');
const money_in = document.getElementById('income');
const money_out = document.getElementById('expense');
const history = document.getElementById('history');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    }

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = '';
    amount.value = '';
   }
}

// Generate random ID 
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add expense to History list (DOM):
function addTransactionDOM(transaction) {

  const item = document.createElement('li');

  // Creates class based on getSign?? value (if negative = .*-danger, if positive = .*-success)
   if (transaction.amount > 0) {
    item.classList.add('list-group-item','d-flex', 'justify-content-between', 'align-items-center', 'list-group-item-success', 'mb-1', 'py-1');
  } else { item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'list-group-item-danger', 'mb-1', 'py-1');}
    
  item.innerHTML = `${transaction.text} 
    <span>${transaction.amount}<button class="btn bi bi-trash ml-2 px-0 py-0"onclick="removeTransaction(${transaction.id})"></button></span>`;
    // <button class="btn bi bi-pencil ml-2 px-0 py-0"></button> 

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

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  init();
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
  history.innerHTML = '';
  
  transactions.forEach(addTransactionDOM);

  updateValues();
}

init();

form.addEventListener('submit', addTransaction);
