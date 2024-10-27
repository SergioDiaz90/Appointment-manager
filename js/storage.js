const handlerSessionStorage = (user, pass, method) => {

    console.log('handlerSessionStorage', {user, pass, method});
    if (method === 'set') {
        return sessionStorage.setItem(user, pass);
    }

    if (method === 'get') {
        return sessionStorage.getItem(user);
    }

    if (method === 'delete') {
        return sessionStorage.removeItem(user);
    }
}

const handlerLocalStorage = (data, clear = false) =>{
    let storageClient = JSON.parse(localStorage.getItem('listClient')) ?? {};
    console.log('handlerLocalStorage', data);

    if (!clear) {
        storageClient[data.historia_clinica] = data;
    }

    if (clear) {
        storageClient = data;
    }

    localStorage.setItem('listClient', JSON.stringify(storageClient));
}

export { handlerSessionStorage , handlerLocalStorage };