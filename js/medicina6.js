
import { login, logOut, validateSession } from './auth.js';
import {
    loginButton, clearPatiente, logoutButton, patientForm, 
    deletePatientsButton, searchPatientButton, loginMessage,
    dashboard, mainContainer, newPatienten, formRegister, closeNewPatienten,
    nextBtnRegister, prevBtnRegister, sendButton, patientId,
    modalCreate, modalDelete, modalConsult, deletePatiente,
    closeDeletePatienten, cancelBtn, showModalConsult, closeModalConsult, navMenu
} from './variables.js';

    
import {
    handlerDisplayContainersForLogin, insertDataInTable,
    handlerStateModal, handlerStepsForm, handlerDataForms } from './functions.js';

import { calendar } from './calendar.js';
import { handlerNavigation } from './navigations.js';

document.addEventListener('DOMContentLoaded', function() {

    /*Llamados*/
    if ( validateSession() ) {
        console.log('hay sesión')
        handlerDisplayContainersForLogin('login');
        calendar();
        insertDataInTable();
    }
    

    // Evento para iniciar sesión
    loginButton.addEventListener('click', () => {
        if (login()) {
            handlerDisplayContainersForLogin('login');
            insertDataInTable();
        }
    });

    // Evento para buscar o registrar un paciente
    searchPatientButton.addEventListener('click', () => {
        insertDataInTable(true);
    });

    patientId.addEventListener('input', () => insertDataInTable());
    // // Función para registrar un nuevo paciente
    // function registerNewPatient(patientId) {
    //     const patientName = prompt('Ingrese el nombre del paciente:');
    //     if (patientName) {
    //         let patients = JSON.parse(localStorage.getItem('patients')) || {};
    //         patients[patientId] = {
    //             id: patientId,
    //             name: patientName,
    //             appointments: []
    //         };
    //         localStorage.setItem('patients', JSON.stringify(patients));
    //         alert(`Paciente ${patientName} registrado exitosamente.`);
    //         openPatientWindow(patientId); // Mostrar la ventana del paciente después de registrar
    //     } else {
    //         alert('El nombre del paciente es obligatorio.');
    //     }
    // }

    clearPatiente.addEventListener('click', () => insertDataInTable(false, true))
    // Mostrar los detalles del paciente en una nueva ventana
    function openPatientWindow(patientId) {
        let patients = JSON.parse(localStorage.getItem('patients')) || {};
        if (patients[patientId]) {
            const patientData = patients[patientId];
            const newWindow = window.open('', '_blank', 'width=600,height=400');

            // HTML dinámico para mostrar la información del paciente
            newWindow.document.write(`
                <html>
                <head>
                    <title>Detalles del Paciente ${patientId}</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        .appointment { border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; }
                        button { margin-top: 10px; }
                        .logo { max-width: 100px; display: block; margin: 0 auto 20px; }
                    </style>
                </head>
                <body>
                    <img src="Logo.png" alt="Logo del Hospital" class="logo">
                    <h1>Historial del Paciente: ${patientData.name} (ID: ${patientData.id})</h1>
                    <div id="appointmentList"></div>
                    
                    <h2>Agendar Cita</h2>
                    <label for="appointmentDate">Fecha de la Cita:</label>
                    <input type="date" id="appointmentDate" name="appointmentDate">
                    <label for="appointmentNotes">Observaciones:</label>
                    <textarea id="appointmentNotes" rows="4" placeholder="Escriba las observaciones aquí..."></textarea>
                    <label for="pdfFile">Adjuntar PDF:</label>
                    <input type="file" id="pdfFile" accept="application/pdf">
                    <button id="scheduleButton">Agendar Cita</button>
                    <div id="confirmationMessage"></div>
                    <button onclick="window.close()">Cerrar</button>

                    <script>
                        const appointmentList = document.getElementById('appointmentList');
                        const confirmationMessage = document.getElementById('confirmationMessage');
                        
                        // Mostrar citas existentes
                        const appointments = ${JSON.stringify(patientData.appointments)};
                        for (const appointment of appointments) {
                            const appointmentItem = document.createElement('div');
                            appointmentItem.className = 'appointment';
                            appointmentItem.innerHTML = \`
                                <p><strong>Fecha:</strong> \${appointment.date}</p>
                                <p><strong>Observaciones:</strong> \${appointment.notes || 'Ninguna'}</p>
                                \${appointment.pdf ? \`<p><a href="\${appointment.pdf}" target="_blank">Ver PDF adjunto</a></p>\` : ''}
                            \`;
                            appointmentList.appendChild(appointmentItem);
                        }

                        // Evento para agendar una cita
                        document.getElementById('scheduleButton').addEventListener('click', function() {
                            const appointmentDate = document.getElementById('appointmentDate').value;
                            const appointmentNotes = document.getElementById('appointmentNotes').value;
                            const pdfFileInput = document.getElementById('pdfFile');

                            if (appointmentDate) {
                                let pdfData = null;
                                const file = pdfFileInput.files[0];

                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = function(e) {
                                        pdfData = e.target.result;
                                        saveAppointment('${patientId}', appointmentDate, appointmentNotes, pdfData);
                                    };
                                    reader.readAsDataURL(file);
                                } else {
                                    saveAppointment('${patientId}', appointmentDate, appointmentNotes, null);
                                }
                            } else {
                                alert('Por favor seleccione una fecha para la cita');
                            }
                        });

                        // Función para guardar la cita en localStorage
                        function saveAppointment(patientId, appointmentDate, appointmentNotes, pdfData) {
                            const patients = JSON.parse(localStorage.getItem('patients'));
                            patients[patientId].appointments.push({ date: appointmentDate, notes: appointmentNotes, pdf: pdfData });
                            localStorage.setItem('patients', JSON.stringify(patients));

                            confirmationMessage.innerText = 'Cita agendada exitosamente.';

                            // Regresar a la ventana principal
                            setTimeout(() => {
                                window.close();
                            }, 1000); // Cierra la ventana después de 1 segundo
                        }
                    </script>
                </body>
                </html>
            `);
            newWindow.document.close(); // Cierra el documento para que se renderice
        } else {
            alert('Paciente no encontrado.');
        }
    }

    // Evento para borrar todos los pacientes
    deletePatientsButton.addEventListener('click', function() {
        if (confirm('¿Está seguro de que desea borrar todos los pacientes?')) {
            localStorage.removeItem('patients');
            alert('Todos los pacientes han sido borrados.');
        }
    });

    // Evento para cerrar sesión
    logout.addEventListener('click', () => {
        let response = logOut();
        console.log('logOut', response);
    });

    //Evento para abrir modal de registro
    newPatienten.addEventListener('click', () => handlerStateModal('open', modalCreate ));

    //Evento para cerrar modal de registro
    closeNewPatienten.addEventListener('click', () => handlerStateModal('close', modalCreate));

    deletePatiente.addEventListener('click', () => handlerStateModal('open', modalDelete ));
    //Evento para cerrar modal de registro
    closeDeletePatienten.addEventListener('click', () => handlerStateModal('close', modalDelete));

    showModalConsult.addEventListener('click', () => handlerStateModal('open', modalConsult));

    closeModalConsult.addEventListener('click', () => handlerStateModal('close', modalConsult));

    navMenu.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        handlerNavigation(`${ e.target.outerText }`);
        console.log('navMenu', e.target.outerText);
    });

    cancelBtn.addEventListener('click', () => {
        handlerStateModal('close', modalDelete);
    });

    //Evento para avanzar en el formulario
    nextBtnRegister.addEventListener('click', () => handlerStepsForm('next'));

    //Evento para retroceder en el formulario
    prevBtnRegister.addEventListener('click', () => handlerStepsForm('prev'));

    formRegister.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('hola soy el evento');
        handlerDataForms(formRegister.elements);
    });

});
