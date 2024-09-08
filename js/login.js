// Manejar la validación de inicio de sesión
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    // Cifrar la contraseña ingresada

    // Obtener la lista de usuarios desde localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Buscar el usuario en la lista
    const user = users.find(user => user.username === username || user.email === username);

    if (user && user.password === password) {
        alert('Inicio de sesión exitoso');
        // Redirigir al usuario a otra página
        window.location.href = 'home.html';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});

