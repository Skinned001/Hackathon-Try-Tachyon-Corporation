// --- JAVASCRIPT PARA EL MENÚ MÓVIL ---
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const navItems = document.querySelectorAll(".nav-links a");
navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    // Previene el comportamiento default solo si no es el link de perfil
    if (e.target.id !== "profileLink") {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove("active");
      }
      navItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
    }
  });
});

// --- JAVASCRIPT PARA LA FUNCIONALIDAD DE PERFIL ---

// 1. Simulación de datos de usuario (en una app real, vendrían del backend)
let currentUser = {
  name: "Usuario Ejemplo",
};

// 2. Referencias a los elementos del modal
const profileLink = document.getElementById("profileLink");
const profileModal = document.getElementById("profileModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const profileForm = document.getElementById("profileForm");
const profileNameInput = document.getElementById("profileName");
const newPasswordInput = document.getElementById("newPassword");
const confirmPasswordInput = document.getElementById("confirmPassword");
const welcomeMessage = document.getElementById("welcomeMessage");

// Actualiza el saludo inicial
welcomeMessage.textContent = `Bienvenido, ${currentUser.name}!`;

// 3. Función para abrir el modal
profileLink.addEventListener("click", () => {
  // Rellena el campo del nombre con el dato actual
  profileNameInput.value = currentUser.name;
  // Limpia los campos de contraseña
  newPasswordInput.value = "";
  confirmPasswordInput.value = "";
  // Muestra el modal
  profileModal.classList.add("visible");
});

// 4. Función para cerrar el modal
const closeModal = () => {
  profileModal.classList.remove("visible");
};

closeModalBtn.addEventListener("click", closeModal);
// También cierra si se hace clic fuera del contenido del modal
window.addEventListener("click", (event) => {
  if (event.target == profileModal) {
    closeModal();
  }
});

// 5. Manejar el envío del formulario de perfil
profileForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Evita que la página se recargue

  const newName = profileNameInput.value.trim();
  const newPassword = newPasswordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // Validación de nombre
  if (!newName) {
    alert("El nombre no puede estar vacío.");
    return;
  }

  // Validación de contraseña
  if (newPassword && newPassword !== confirmPassword) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  // Actualizar los datos del usuario
  currentUser.name = newName;
  // En una app real, aquí enviarías los datos al backend
  if (newPassword) {
    console.log("Contraseña actualizada (simulado).");
    // Ejemplo de fetch:
    // fetch('/api/update-password', { method: 'POST', body: JSON.stringify({ newPassword }) });
  }

  // Actualizar la UI
  welcomeMessage.textContent = `Bienvenido, ${currentUser.name}!`;

  alert("¡Perfil actualizado con éxito!");
  closeModal();
});
