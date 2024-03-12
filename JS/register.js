document.getElementById('register-form').onsubmit = function (event) {
    event.preventDefault();
    var nombreUsuario = document.getElementById('iniciar-sesion').value;
    var password = document.getElementById('contrasena').value;

    registerUser(nombreUsuario, password);

    window.location.href = 'login.html';
    alert('Te has registrado con exito, ' + nombreUsuario);
  };

  function registerUser(username, password) {
    localStorage.setItem(username, JSON.stringify({ password: password, balance: 1000 }));
  }