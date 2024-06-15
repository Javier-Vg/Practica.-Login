import { getData, deleteData } from "./fetch.js";
import { mostrarMensaje } from "./validaciones.js";

const id = localStorage.getItem("usuarioActivo");
const mensaje = document.getElementById("mensaje");

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("usuarioActivo");
  mostrarMensaje(mensaje, ["Cerrando sesión..."]);
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
});

document.getElementById("eliminarBtn").addEventListener("click", async () => {
  let response = await deleteData(id);
  if (response !== null) {
    mostrarMensaje(mensaje, ["Usuario eliminado con éxito"]);
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  } else {
    mostrarMensaje(mensaje, ["Hubo un error al elimintar tu cuenta, por favor intente más tarde."]);
  }
});

let mensajeInicial = async () => {
  let usuario = await getData(id);
  document.getElementById("bienvenida").innerHTML = `Hola ${usuario.nombreUsuario}`;
}

mensajeInicial();