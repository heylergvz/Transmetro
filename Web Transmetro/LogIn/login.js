document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
   
    if (username === 'muni' && password === '123') {
      // Redirigir al usuario a la página principal después de iniciar sesión (cambiar 'main.html' por la ruta adecuada)
      window.location.href = '../Buses/buses.html';
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  });