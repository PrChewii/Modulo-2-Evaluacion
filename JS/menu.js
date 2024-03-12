window.onload = function () {
    var nombreUsuario = localStorage.getItem('nombreUsuario');
    if (nombreUsuario) {
        var userData = JSON.parse(localStorage.getItem(nombreUsuario));
        var saldo = userData ? userData.balance : 'No disponible';
        document.getElementById('mensaje-bienvenida').textContent = '¡Bienvenido ' + nombreUsuario + '!';
        animateNumber(value => {
            document.getElementById('saldo').textContent = '$ ' + Math.floor(value);
        }, 0, saldo, 2000);
    }
};

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