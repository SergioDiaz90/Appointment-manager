import { handlerSessionStorage } from "./storage.js";
import { logoutButton } from "./variables.js";
import { handlerDisplayContainersForLogin } from './functions.js';

const validUsuario = "Danielfarias10";

const login = () => {
    const validEmpresa = "ALGORITMIA 1";
    const validContrasena = "salome2905";
    let empresaName = document.getElementById('empresaName').value.trim();
    let usuario = document.getElementById('usuario').value.trim();
    let contrasena = document.getElementById('contrasena').value;

    if (empresaName === validEmpresa &&
        usuario === validUsuario &&
        contrasena === validContrasena) {
        console.log('antes de guardar');
        handlerSessionStorage(usuario, contrasena, 'set');
        // empresaName.value = "";
        // usuario.value = "";
        // contrasena.value = "";
        return true;
    } else {
        alert("Credenciales incorrectas.");
    }

    return false;
}

const logOut = () => {
    // mainContainer.style.display = 'block';
    // loginSection.style.display = 'block'; // Mostrar sección de inicio de sesión
    // dashboard.style.display = 'none';
    // patientForm.style.display = 'none'; // Ocultar formulario de pacientes
    // deletePatientsButton.style.display = 'none'; // Ocultar botón de borrar pacientes
    // logoutButton.style.display = 'none'; // Ocultar botón de cerrar sesión

    handlerDisplayContainersForLogin();
    return handlerSessionStorage(validUsuario, '', 'delete');
}

const validateSession = () => {
    return handlerSessionStorage("Danielfarias10", '', 'get') !== null;
}

export {login, logOut, validateSession};