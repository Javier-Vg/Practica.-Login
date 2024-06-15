import { validarVacio, validarEspaciosVacios, validarUsuarioExiste, mostrarMensaje } from "./validaciones.js";
import { putData } from "./fetch";

document.getElementById("recuperarBtn").addEventListener("click", async (e) => {
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
      if (existeUsuario.id !== "" && existeUsuario.error === "") {
        let usuario = {
          id: existeUsuario.id,
          password: inputPass
        }
        mostrarMensaje(alertaDiv);
        if (await putData(usuario) !== null) {
          mostrarMensaje(alertaDiv, ["Contraseña modificada con éxito, redirigiendo a página de login"]);
          setTimeout(() => {
            window.location.href = "index.html";
          }, 1000);
        } else {
          mostrarMensaje(alertaDiv, ["Algo salió mal en el servidor, por favor intente más tarde"]);
        }
      } else {
        existeUsuario.error !== "" ? mostrarMensaje(alertaDiv, [existeUsuario.error]) : mostrarMensaje(alertaDiv, ['Usuario no existe']);
      }
    } else {
      mostrarMensaje(alertaDiv, ["Contraseñas no coinciden."]);
    }
  } else {
    mostrarMensaje(alertaDiv, [vacio.mensaje, espacioVacio.mensaje]);
  }
});