import { getData, deleteData, putData } from "./fetch.js";
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


//Comentarios
const inputComent = document.getElementById("coment");
const escritura = document.getElementById("escritura");
const divComent = document.getElementById("comentDiv");
let idActivo = localStorage.getItem("usuarioActivo");
inputComent.addEventListener("keyup" , async (e) => {
  e.preventDefault();
  
  let users = await getData();
  let comentario = "";

  
  escritura.innerHTML = e.target.value;

  if (e.key === 'Enter') {

    divComent.innerHTML += "-"+e.target.value+" <br>";
    users.forEach(user => {
      if (user.id === idActivo) {
        if (user.coments == null) { //Verifica si hubo algun otro comentario, esto para no sobreescribirlo con el nuevo comentario
          comentario = {
            id: idActivo,
            coments: {
              coment: [[inputComent.value]]
            }
          }
          
        }else{
          comentario = {
            id: idActivo,
            coments: {
              coment: [inputComent.value] + user.coments.coment
            }
          }
        }
      }
    });
    
    putData(comentario)
    
    

  }
})




let mensajeInicial = async () => {
  let usuario = await getData(id);
  document.getElementById("bienvenida").innerHTML = `Hola ${usuario.nombreUsuario}`;
}

mensajeInicial();