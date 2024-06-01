document.addEventListener('DOMContentLoaded', function() {
    let selectedChofer = null;
    const busesContainer = document.querySelector('.buses');
    const choferesContainer = document.querySelector('.choferes'); // Selecciona el contenedor de choferes
  
    busesContainer.addEventListener('click', function(event) {
      const bus = event.target.closest('.bus');
      if (bus && !bus.classList.contains('assigned')) {
        if (selectedChofer) {
          assign(bus, selectedChofer);
          selectedChofer = null;
        } else {
          alert('Selecciona un chofer primero.');
        }
      }
    });
  
    document.querySelectorAll('.unassign-btn').forEach(unassignBtn => {
      unassignBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        const bus = event.target.closest('.bus');
        const chofer = bus.assignedChofer; // Obtenemos el chofer asignado directamente del bus
        unassign(bus, chofer);
      });
    });
  
    choferesContainer.addEventListener('click', function(event) { // Agrega un event listener al contenedor de choferes
      const chofer = event.target.closest('.chofer');
      if (chofer && !chofer.classList.contains('assigned')) {
        selectedChofer = chofer;
        choferesContainer.querySelectorAll('.chofer').forEach(c => c.classList.remove('selected'));
        chofer.classList.add('selected');
      }
    });
  
    const addBusBtn = document.getElementById('add-bus-btn');
    addBusBtn.addEventListener('click', function() {
      const busName = prompt('Ingresa el nombre del nuevo bus:');
      if (busName) {
        addBus(busName);
      }
    });

    const addChoferBtn = document.getElementById('add-chofer-btn'); // Selecciona el botón de agregar chofer
    addChoferBtn.addEventListener('click', function() { // Agrega un event listener para el clic en el botón de agregar chofer
      const choferName = prompt('Ingresa el nombre del nuevo chofer:');
      if (choferName) {
        addChofer(choferName);
      }
    });
  
    function addBus(busName) {
        const newBus = document.createElement('li');
        newBus.className = 'bus available';
        newBus.innerHTML = `${busName} <button class="unassign-btn">Desasignar</button> <button class="delete-bus-btn">Eliminar</button>`;
        newBus.assignedChofer = null; // Inicializamos la propiedad assignedChofer del bus como null
        busesContainer.insertBefore(newBus, addBusBtn);
        updateUnassignButtonVisibility();
      
        // Agregar event listener para el clic en el botón de eliminar bus
        newBus.querySelector('.delete-bus-btn').addEventListener('click', function() {
          busesContainer.removeChild(newBus); // Eliminar el bus
          updateUnassignButtonVisibility();
        });
      
        // Agregar event listener para el clic en el botón de desasignar bus
        newBus.querySelector('.unassign-btn').addEventListener('click', function(event) {
          event.stopPropagation();
          unassign(newBus, newBus.assignedChofer);
        });
      }
      
    function addChofer(choferName) {
        const newChofer = document.createElement('li');
        newChofer.className = 'chofer available';
        newChofer.textContent = choferName;

        const deleteChoferBtn = document.createElement('button'); // Crear el botón de eliminar
        deleteChoferBtn.textContent = 'Eliminar';
        deleteChoferBtn.className = 'delete-chofer-btn'; // Agregar clase CSS
        deleteChoferBtn.addEventListener('click', function() { // Agregar event listener para el clic en el botón de eliminar
          choferesContainer.removeChild(newChofer); // Eliminar el chofer
        });
        
        newChofer.appendChild(deleteChoferBtn); // Agregar el botón de eliminar al elemento del chofer
        choferesContainer.insertBefore(newChofer, addChoferBtn); // Inserta el nuevo chofer antes del botón "Agregar Chofer"
      }
    function assign(bus, chofer) {
      bus.classList.add('assigned');
      bus.classList.remove('available');
      bus.querySelector('.unassign-btn').textContent = `Desasignar ${chofer.textContent}`;
      bus.assignedChofer = chofer; // Asignamos directamente el chofer al bus

      chofer.classList.add('assigned');
      chofer.classList.remove('available');
      chofer.classList.remove('selected');
      updateUnassignButtonVisibility();
    }
      
    function unassign(bus, chofer) {
      chofer.classList.remove('assigned');
      chofer.classList.add('available');
      bus.classList.remove('assigned');
      bus.classList.add('available');
      bus.querySelector('.unassign-btn').textContent = 'Desasignar';
      bus.assignedChofer = null; // Desasignamos el chofer del bus
      updateUnassignButtonVisibility();
    }
  
    function updateUnassignButtonVisibility() {
      document.querySelectorAll('.bus').forEach(bus => {
        const unassignBtn = bus.querySelector('.unassign-btn');
        if (bus.classList.contains('assigned')) {
          unassignBtn.hidden = false;
        } else {
          unassignBtn.hidden = true;
        }
      });
    }

    document.getElementById('logout-btn').addEventListener('click', function() {
        window.location.href = '../LogIn/login.html';
    });
});