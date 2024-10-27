const Inicio = document.querySelector('#Inicio');
const Consultas = document.querySelector('#Consultas');

const handlerNavigation = (text) => {
    let navList = [ Inicio, Consultas ];

    navList.map(items => {

        if (items.id === text) {
            items.style.display = 'block';
        }

        if (items.id !== text && (text === 'Inicio' || text === 'Consultas')) {
            items.style.display = 'none';
            console.warn('items', items.id, text);
        }
        
    });
}


export { handlerNavigation };