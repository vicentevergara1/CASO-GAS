document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const usuarioInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const mensajeError = document.getElementById('error-message');

    if (usuarioInput === 'admin' && passwordInput === '1234') {
        mensajeError.style.display = 'none';
        localStorage.setItem('usuarioAutenticado', 'true');
        window.location.href = 'admin.html';
    } else {
        mensajeError.style.display = 'block';
    }
});