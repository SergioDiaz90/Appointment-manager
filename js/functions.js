import { handlerLocalStorage } from "./storage.js";

import {
    dashboard, mainContainer,formRegister, sendButton , closeNewPatienten,
    nextBtnRegister, prevBtnRegister, modalCreate, modalDelete
} from './variables.js';

const handlerDisplayContainersForLogin = (status = false) => {
    console.log('handlerDisplayContainersForLogin');
    mainContainer.style.display = status === 'login' ? 'none' : 'block';
    dashboard.style.display = status === 'login' ? 'flex' : 'none';

    // logoutButton.style.display = 'flex';
    // mainContainer.style.display = 'none';
    // loginSection.style.display = 'none'; // Ocultar la sección de inicio de sesión
    // patientForm.style.display = 'none'; // Mostrar el formulario de pacientes
    // deletePatientsButton.style.display = 'none'; // Mostrar botón de borrar pacientes
    // // loginMessage.innerText = ""; // Limpiar mensaje

    // loginSection.style.display = 'block'; // Mostrar sección de inicio de sesión
    // dashboard.style.display = 'none';
    // patientForm.style.display = 'none'; // Ocultar formulario de pacientes
    // deletePatientsButton.style.display = 'none'; // Ocultar botón de borrar pacientes
    // logoutButton.style.display = 'none'; // Ocultar botón de cerrar sesión

}

const insertDataInTable = (find = false, clear = false) => {
    const tbody = document.querySelector('.patienten-table__body');
    let patientId;
    let pacientes = JSON.parse(localStorage.getItem('listClient'));
    let listFilteredPacienten;
    tbody.innerHTML = ''; // Limpiar cualquier contenido previo

    if (find) {
        patientId = document.getElementById('patientId').value.trim();
        let result = pacientes[patientId];

        if (!result) {
            alert('Paciente no encontrado');
        }

        listFilteredPacienten = result !== undefined ? { patientId: result } : pacientes;
    }

    if (!find) {
        listFilteredPacienten = pacientes;
    }

    console.log('insertDataInTable', pacientes);

    if (clear) {
        patientId = document.getElementById('patientDelete').value.trim();
        console.log('patientId', listFilteredPacienten[patientId]);
        delete listFilteredPacienten[patientId];
        handlerLocalStorage(listFilteredPacienten, true);
        handlerStateModal('close', modalDelete);
        alert('Paciente eliminado.');
    }

    for(let paciente in listFilteredPacienten) {
        console.log('paciente', paciente);
        const fila = document.createElement('tr');
        fila.classList.add('patienten-table__row');

        // Crear las celdas
        const celdaID = document.createElement('td');
        celdaID.classList.add('patienten-table__cell');
        celdaID.textContent = listFilteredPacienten[paciente].historia_clinica;

        const celdaNombre = document.createElement('td');
        celdaNombre.classList.add('patienten-table__cell');
        celdaNombre.textContent = listFilteredPacienten[paciente].name;

        const celdaCorreo = document.createElement('td');
        celdaCorreo.classList.add('patienten-table__cell');
        celdaCorreo.textContent = listFilteredPacienten[paciente].email;

        const celdaNumero = document.createElement('td');
        celdaNumero.classList.add('patienten-table__cell');
        celdaNumero.textContent = listFilteredPacienten[paciente].phone;

        const celdaHistoria = document.createElement('td');
        celdaHistoria.classList.add('patienten-table__cell');
        celdaHistoria.textContent = listFilteredPacienten[paciente].historia_clinica;

        // Agregar las celdas a la fila
        fila.appendChild(celdaID);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaCorreo);
        fila.appendChild(celdaNumero);
        fila.appendChild(celdaHistoria);

        // Agregar la fila al cuerpo de la tabla
        tbody.appendChild(fila);
    };
}

const searchPatient = () => {
    console.log('searchPatient');
    const patientId = document.getElementById('patientId').value.trim();

        if (patientId) {
            let patients = JSON.parse(localStorage.getItem('listClient')) || {};
            if (patients[patientId]) {
                return patients[patientId];
                // openPatientWindow(patientId);
            } else {
                return {};
                if (confirm('Paciente no encontrado. ¿Desea registrarlo?')) {
                    registerNewPatient(patientId);
                }
            }
        } else {
            alert('Por favor ingrese el número de identificación del paciente');
        }
}

const disabledBtnsModal = (numb = NaN, reset = false) => {

    console.log('disabledBtnsModal', {numb});

    if (numb === 0) {
        prevBtnRegister.disabled = true;
        sendButton.classList.remove('active');
        
    }

    if (numb === 1) {
        prevBtnRegister.disabled = false;
        nextBtnRegister.disabled = false;
        sendButton.classList.remove('active');

    }

    if (numb === 2) {
        nextBtnRegister.disabled = true;
        sendButton.classList.add('active');
    }

    if (reset) {
        prevBtnRegister.disabled = true;
        nextBtnRegister.disabled = false;
        sendButton.classList.remove('active');
    }
}

const handlerStepsForm = (step, reset = false) => {
    const register = [ ...document.querySelector('#forms-wrapper').children ];
    let conditionalNumber;

    for (let itr = 0;  itr < register.length; itr += 1) {

        if (!reset) {
            if (register[itr].classList.contains('active') && itr <= 3 && itr >= 0) {

                if (step === 'next') {
                    conditionalNumber = itr === 2 ? itr : itr + 1;
                }

                if (step === 'prev') {
                    conditionalNumber = itr === 0 ? itr : itr - 1;
                }

                register[itr].classList.remove('active');
                register[conditionalNumber].classList.add('active');
                disabledBtnsModal(conditionalNumber);
                
                break;
            }
        }

        if (reset) {
            register[register.length - 1].classList.remove('active');
            register[0].classList.add('active');
            disabledBtnsModal('', reset);
            break;
        }
    }
}

const handlerStateModal = (status, elm) => {
    const modal = document.querySelector('#modal');

    if (status === 'open') {
        elm.classList.add('active');
        console.log(`Se ha ejecutado la operacion ${status}, en el modal con éxito.`)
    }

    if (status === 'close') {
        elm.classList.remove('active');
        console.log('formRegister', formRegister);
        if(formRegister) {
            formRegister.reset();
            handlerStepsForm('prev', true);
        }

        console.log(`Se ha ejecutado la operacion ${status}, en el modal con éxito.`)
    }
}

const handlerDataForms = (data) => {
    let dataClient = {
        historia_clinica: chainRnd(),
    };

    for(let item of data) {
        dataClient[item.id] = item.value;
    }

    handlerLocalStorage(dataClient);
    insertDataInTable();
    handlerStateModal('close', modalCreate);
    console.log('handlerDataForms', dataClient);
}

const chainRnd = (longitud = 8) => {
    const banco = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let aleatoria = "";
    for (let i = 0; i < longitud; i++) {
        aleatoria += banco.charAt(Math.floor(Math.random() * banco.length));
    }
    return aleatoria;
};

export { handlerDisplayContainersForLogin, insertDataInTable,
    searchPatient, handlerStateModal, handlerDataForms, handlerStepsForm };