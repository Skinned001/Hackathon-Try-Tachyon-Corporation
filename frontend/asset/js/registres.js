// Espera a que todo el contenido del HTML esté cargado
document.addEventListener("DOMContentLoaded", () => {
  // 1. OBTENER REFERENCIAS A LOS ELEMENTOS DEL DOM
  const formulario = document.getElementById("registro-form");
  const mensajeDiv = document.getElementById("mensaje");

  // 2. AÑADIR EL EVENTO 'SUBMIT' AL FORMULARIO
  formulario.addEventListener("submit", async (event) => {
    // Previene el comportamiento por defecto del formulario (recargar la página)
    event.preventDefault();

    // 3. CAPTURAR LOS VALORES DE LOS INPUTS
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validación simple en el frontend (no reemplaza la del backend)
    if (!nombre || !email || !password) {
      mensajeDiv.textContent = "Todos los campos son obligatorios.";
      mensajeDiv.className = "mensaje error";
      return;
    }

    // 4. CREAR EL OBJETO DE DATOS (EL "MODELO" DEL FRONTEND)
    const datosUsuario = {
      nombre: nombre,
      email: email,
      password: password,
    };

    // 5. ENVIAR LOS DATOS AL BACKEND USANDO FETCH
    try {
      // Reemplaza esta URL con la de tu endpoint de registro real
      const respuesta = await fetch(
        "https://api.tuproyecto.com/auth/register",
        {
          method: "POST",
          headers: {
            // Le decimos al backend que estamos enviando datos en formato JSON
            "Content-Type": "application/json",
          },
          // Convertimos el objeto de JavaScript a una cadena de texto JSON
          body: JSON.stringify(datosUsuario),
        }
      );

      // Convertimos la respuesta del backend (que también es JSON) a un objeto JS
      const resultado = await respuesta.json();

      // 6. MANEJAR LA RESPUESTA DEL BACKEND
      if (respuesta.ok) {
        // Si el código HTTP es 200-299
        mensajeDiv.textContent = "¡Registro exitoso! Redirigiendo...";
        mensajeDiv.className = "mensaje exito";
        // Opcional: limpiar el formulario
        formulario.reset();
        // Opcional: redirigir al login después de unos segundos
        setTimeout(() => {
          window.location.href = "/login.html";
        }, 2000);
      } else {
        // Si hay un error (ej. email duplicado)
        mensajeDiv.textContent = resultado.message || "Ocurrió un error.";
        mensajeDiv.className = "mensaje error";
      }
    } catch (error) {
      // Este error se dispara si hay un problema de red o el servidor no responde
      console.error("Error de conexión:", error);
      mensajeDiv.textContent =
        "No se pudo conectar con el servidor. Inténtalo más tarde.";
      mensajeDiv.className = "mensaje error";
    }
  });
});
