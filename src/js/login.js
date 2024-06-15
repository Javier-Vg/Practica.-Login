import { validarVacio, validarEspaciosVacios, mostrarMensaje } from "./validaciones.js";
import { getData } from "./fetch.js"

document.getElementById("loginBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  const inputUsuario = document.getElementById("inputUsuario").value;
  const inputPass = document.getElementById("inputPass").value;
  const alertaDiv = document.getElementById("alertaDiv");
  const vacio = validarVacio(inputUsuario, inputPass);
  const espacioVacio = validarEspaciosVacios(inputUsuario, inputPass);
  
  if (!vacio.error && !espacioVacio.error) {
    mostrarMensaje(alertaDiv);
    let usuarios = await getData();
    if (usuarios !== null) {
      let match = false;
      usuarios.forEach(usuario => {
        if (inputUsuario === usuario.nombreUsuario) {
          if (inputPass === usuario.password) {
            match = true;
            localStorage.setItem("usuarioActivo", usuario.id);
          }
        }
      });
      if (match) {
        mostrarMensaje(alertaDiv, ["Iniciando sesión..."])
        window.location.href = "home.html"
      } else {
        mostrarMensaje(alertaDiv, ["Usuario y contraseña no coinciden"])
      }
    } else {
      mostrarMensaje(alertaDiv, ["Algo salió mal en el servidor, por favor intente más tarde"]);
    }
  } else {
    mostrarMensaje(alertaDiv, [vacio.mensaje, espacioVacio.mensaje]);
  }
});