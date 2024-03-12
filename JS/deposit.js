var nombreUsuario = localStorage.getItem('nombreUsuario');
if (nombreUsuario) {
  loadUserData(nombreUsuario);
}
function loadUserData(nombreUsuario) {
  var userData = JSON.parse(localStorage.getItem(nombreUsuario));
  var saldo = userData ? userData.balance : 0;
  document.getElementById('saldo').textContent = '$ ' + saldo;
  animateNumber(value => {
    document.getElementById('saldo').textContent = '$ ' + Math.floor(value);
  }, 0, saldo, 2000);
}

function animateNumber(callback, from, to, duration) {
  let start = null;
  const animate = timestamp => {
    start = start || timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    callback(progress * (to - from) + from);
    if (progress < 1) {
      window.requestAnimationFrame(animate);
    }
  };
  window.requestAnimationFrame(animate);
}

function deposit(event) {
  event.preventDefault();
  var nombreUsuario = localStorage.getItem('nombreUsuario');
  if (!nombreUsuario) return;

  var userData = JSON.parse(localStorage.getItem(nombreUsuario)) || { balance: 0 };
  var depositAmount = parseFloat(document.getElementById("depositAmount").value);
  if (isNaN(depositAmount) || depositAmount <= 0) {
    alert('Por favor, ingrese una cantidad válida.');
    return;
  }

  userData.balance += depositAmount;
  localStorage.setItem(nombreUsuario, JSON.stringify(userData));

  loadUserData(nombreUsuario);
  alert('Depósito realizado con éxito.');

  var depositAmount = parseFloat(document.getElementById("depositAmount").value);
  saveTransaction('Depositos de tu Visa', depositAmount);
}
//Guardar transiciones en transactions.html 
function saveTransaction(type, amount) {
  var transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  var transaction = {
    id: Date.now(),
    type: type,
    amount: amount,
    date: new Date().toLocaleString()
  };
  transactions.push(transaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

