import { validarVacio, validarEspaciosVacios, validarUsuarioExiste, mostrarMensaje } from "./validaciones.js";
import { postData } from "./fetch.js"

document.getElementById("registrarBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  const inputUsuario = document.getElementById("inputUsuario").value;
  const inputPass = document.getElementById("inputPass").value;
  const inputPassRepeat = document.getElementById("inputPassRepeat").value;
  const alertaDiv = document.getElementById("alertaDiv");
  const vacio = validarVacio(inputUsuario, inputPass);
  const espacioVacio = validarEspaciosVacios(inputUsuario, inputPass);

  if (!vacio.error && !espacioVacio.error) {
    if (inputPass === inputPassRepeat) {
      let existeUsuario = await validarUsuarioExiste(inputUsuario);
      if (existeUsuario.id === "" && existeUsuario.error === "") {
        mostrarMensaje(alertaDiv);
        let nuevoUsuario = {
          nombreUsuario: inputUsuario,
          password: inputPass
        };
        if (await postData(nuevoUsuario) !== null) {
          mostrarMensaje(alertaDiv, ["Usuario creado exitosamente, redirigiendo a página de login"]);
          setTimeout(() => {
            window.location.href = "index.html";
          }, 1000);
        } else {
          mostrarMensaje(alertaDiv, ["Algo salió mal en el servidor, por favor intente más tarde"]);
        }
      } else {
        existeUsuario.error !== "" ? mostrarMensaje(alertaDiv, [existeUsuario.error]) : mostrarMensaje(alertaDiv, ['Usuario ya existe. <a href="index.html">Inicia sesión.</a>']);
      }
    } else {
      mostrarMensaje(alertaDiv, ["Contraseñas no coinciden."]);
    }
  } else {
    mostrarMensaje(alertaDiv, [vacio.mensaje, espacioVacio.mensaje]);
  }
});