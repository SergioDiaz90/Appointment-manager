const loginButton = document.getElementById('loginButton');
const loginSection = document.getElementById('loginSection');
const patientForm = document.getElementById('patientForm');
const deletePatientsButton = document.getElementById('deletePatientsButton');
const searchPatientButton = document.getElementById('searchPatientButton');
const logoutButton = document.getElementById('logout');
const loginMessage = document.getElementById('loginMessage');
const dashboard = document.querySelector('#dashboard');
const mainContainer = document.querySelector('#mainContainer');
const newPatienten = document.querySelector('#new-patienten');
const formRegister = document.querySelector('#register');
const closeNewPatienten = document.querySelector('#close-modal-btn');
const closeDeletePatienten = document.querySelector('#close-modal-delete');
const nextBtnRegister = document.querySelector('#next-btn');
const prevBtnRegister = document.querySelector('#prev-btn');
const sendButton = document.querySelector('#submit-btn');
const patientId = document.querySelector('#patientId');
const modalDelete = document.querySelector('#modal-delete');
const modalCreate = document.querySelector('#modal');
const modalConsult = document.querySelector('#modal-consult');
const deletePatiente = document.querySelector('#delete-btn');
const cancelBtn = document.querySelector('#cancel-btn');
const clearPatiente = document.querySelector('#del');
const showModalConsult = document.querySelector('#calendarDates');
const closeModalConsult = document.querySelector('#close-modal-consult');
const navMenu = document.querySelector('#nav-menu');

export {
    loginButton, loginSection, logoutButton, patientForm, 
    deletePatientsButton, searchPatientButton, loginMessage,
    dashboard, mainContainer, newPatienten, formRegister, closeNewPatienten,
    nextBtnRegister, prevBtnRegister, sendButton, patientId, modalCreate, modalDelete,
    deletePatiente, closeDeletePatienten, cancelBtn, clearPatiente, modalConsult, showModalConsult,
    closeModalConsult, navMenu
};