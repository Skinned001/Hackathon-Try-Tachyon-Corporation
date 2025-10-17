document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("registro-form");
  const mensajeDiv = document.getElementById("mensaje");

  formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!username || !email || !password) {
      mensajeDiv.textContent = "Todos los campos son obligatorios.";
      mensajeDiv.className = "mensaje error";
      return;
    }

    try {
      const respuesta = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const resultado = await respuesta.json();

      if (respuesta.ok) {
        mensajeDiv.textContent = "¡Registro exitoso!";
        mensajeDiv.className = "mensaje exito";
        formulario.reset();
        setTimeout(() => (window.location.href = "login.html"), 1500);
      } else {
        mensajeDiv.textContent = resultado.message || "Error al registrarse.";
        mensajeDiv.className = "mensaje error";
      }
    } catch (error) {
      console.error(error);
      mensajeDiv.textContent = "No se pudo conectar con el servidor.";
      mensajeDiv.className = "mensaje error";
    }
  });
});
