function registerUser(username, password) {
    localStorage.setItem(username, JSON.stringify({ password: password, balance: 0 }));
  }
  function checkLogin(username, password) {
    let user = localStorage.getItem(username);
    if (user) {
      user = JSON.parse(user);
      return user.password === password;
    }
    return false;
  }

  function getBalance(username) {
    let user = localStorage.getItem(username);
    if (user) {
      user = JSON.parse(user);
      return user.balance;
    }
    return null;
  }

  function updateBalance(username, amount) {
    let user = localStorage.getItem(username);
    if (user) {
      user = JSON.parse(user);
      user.balance += amount;
      localStorage.setItem(username, JSON.stringify(user));
    }
  }

  document.getElementById('login-form').onsubmit = function (event) {
    event.preventDefault();
    var nombreUsuario = document.getElementById('iniciar-sesion').value;
    var password = document.getElementById('contrasena').value;

    if (checkLogin(nombreUsuario, password)) {
      localStorage.setItem('nombreUsuario', nombreUsuario);
      window.location.href = 'menu.html';
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };
  $(document).ready(function () {
    $('#iniciar-sesion, #contrasena').focus(function () {
      $(this).prev('label').animate({ opacity: 0 }, 200);
    }).blur(function () {
      $(this).prev('label').animate({ opacity: 1 }, 200);
    });
  });