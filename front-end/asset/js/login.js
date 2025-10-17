// Esperamos a que el contenido de la página cargue completamente
document.addEventListener("DOMContentLoaded", () => {
  // 1. Obtenemos la referencia al formulario y al div de mensajes
  const formulario = document.getElementById("loginForm");
  const divMensaje = document.getElementById("mensaje");

  // 2. Escuchamos el evento 'submit' del formulario
  formulario.addEventListener("submit", async (evento) => {
    // Evitamos que la página se recargue
    evento.preventDefault();

    // 3. Capturamos los valores de los campos
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // 4. Creamos el objeto con los datos para el backend
    const datosLogin = {
      email,
      password,
    };

    // 5. Enviamos los datos al servidor local
    try {
      // ¡IMPORTANTE! Reemplaza esta URL con tu endpoint de login // Ejemplo de URL
      const respuesta = await fetch("http://localhost:3008/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosLogin),
      });

      const resultado = await respuesta.json();

      // 6. Manejamos la respuesta del servidor
      if (respuesta.ok) {
        // Si el login es exitoso
        divMensaje.textContent = "¡Inicio de sesión exitoso! Redirigiendo...";
        divMensaje.className = "exito";

        // Opcional: Si el backend devuelve un token (JWT), puedes guardarlo
        if (resultado.token) {
          localStorage.setItem("authToken", resultado.token);
        }

        // Opcional: Redirigir al usuario a una página de bienvenida o al dashboard
        setTimeout(() => {
          window.location.href = "mainMenu.html"; // Cambia a tu página principal
        }, 1500);
      } else {
        // Si las credenciales son incorrectas o hay otro error
        divMensaje.textContent = `Error: ${resultado.message || "Credenciales incorrectas."
          }`;
        divMensaje.className = "error";
      }
    } catch (error) {
      // Si el servidor no responde
      console.error("Error de conexión:", error);
      divMensaje.textContent =
        "No se pudo conectar al servidor. Inténtalo más tarde.";
      divMensaje.className = "error";
    }
  });
});
