import { getData, deleteData, putData } from "./fetch.js";
import { mostrarMensaje, validarVacio } from "./validaciones.js";

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
const alertaDiv = document.getElementById("mensajeDiv");

let idActivo = localStorage.getItem("usuarioActivo");
let match = false;

console.log(idActivo);
let TotalComents = [];

inputComent.addEventListener("keyup" , async (e) => {
  e.preventDefault();
  
  let users = await getData();
  

  escritura.innerHTML = e.target.value;

  if (e.key === 'Enter') {
    const vacio = validarVacio(inputComent.value);
    if (!vacio.error) {
      divComent.innerHTML += "-"+e.target.value+" <br>";
      escritura.innerHTML= "";

      
      let input = inputComent.value;

      users.forEach(user => {
        if (user.id === idActivo){
          match = true;
          if(user.coments === undefined){
            TotalComents.push(input);
  
            let comentario = {
              id: idActivo,
              coments: TotalComents
            }
            putData(comentario)
          }else{
            
            let arrayComentarios = user.coments
            arrayComentarios.push(input)
            
            let comentario = {
              id: idActivo,
              coments: arrayComentarios
            }
            putData(comentario)
          }  
          if (match) {
            mostrarMensaje(alertaDiv, ["Agregando comentario..."]);

            setTimeout(function() {
              alertaDiv.innerHTML = "";
            }, 1500);  
          }
        }
      })
    }else{
      mostrarMensaje(alertaDiv, [vacio.mensaje]);
      setTimeout(function() {
        alertaDiv.innerHTML = "";
      }, 1500);
    }
  }
});


window.addEventListener("load" , async () =>{
    let users = await getData();
    users.forEach(com => {
      if (com.id == idActivo) {
        if (com.coments != undefined) {
          let array = com.coments;
          console.log(array);
          for (const comentarios of array) {
            divComent.innerHTML += "-"+comentarios+"<br>";
          }
          
        }else{
          alert("No hay comentarios")
        }
      }
    });
})




let mensajeInicial = async () => {
  let usuario = await getData(id);
  document.getElementById("bienvenida").innerHTML = `Hola ${usuario.nombreUsuario}`;
}

mensajeInicial();