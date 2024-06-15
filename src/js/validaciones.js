import { getData } from "./fetch.js"

export let validarVacio = (...inputs) => {
  let validacion = {
    mensaje : "",
    error: false,
  };
  inputs.forEach(input => {
    if (input.trim() === "") {
      validacion.mensaje = "Por favor llene los campos.";
      validacion.error = true;
    }
  });
  return validacion;
}

export let validarEspaciosVacios = (...inputs) => {
  let validacion = {
    mensaje : "",
    error: false,
  };
  inputs.forEach(input => {
    if (!(/^\S*$/.test(input))) { //regex
      validacion.mensaje = "Por favor no ingrese espacios vacíos.";
      validacion.error = true;
    }
  });
  return validacion;
}

export let validarUsuarioExiste = async (inputUsuario) => {
  let data = await getData();
  let respuesta = {
    id: "",
    error: "",
  }
  if (data !== null) {
    data.forEach(usuario => {
      if (inputUsuario === usuario.nombreUsuario) {
        respuesta.id = usuario.id;
      }
    });
  } else {
    respuesta.error = "Algo salió mal en el servidor, por favor intente más tarde.";
  }
  return respuesta;
}

export let mostrarMensaje = (html, mensajes = []) => {
  html.innerHTML = "";
  if (mensajes.length !== 0) {
    mensajes.forEach(mensaje => {
      if(mensaje !== "") {
        let p = document.createElement("p")
        p.innerHTML = mensaje;
        html.appendChild(p);
      }
    });
    html.style.display = "block";
  } else {
    html.style.display = "none";
  }
}