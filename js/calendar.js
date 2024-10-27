const calendar = () => {
    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const days = [
        'Domingo', "Lunes", "Martes", "Miercoles", 'Jueves', 'Viernes', 'Sábado'
    ];

    // Elementos del DOM
    const currentMonthYear = document.getElementById("currentMonthYear");
    const calendarDates = document.getElementById("calendarDates");
    const prevMonthBtn = document.getElementById("prevMonthBtn");
    const nextMonthBtn = document.getElementById("nextMonthBtn");

    // Mostrar el mes y año actuales
    function updateCalendar(month, year) {
    currentMonthYear.textContent = `${months[month]} ${year}`;
    generateCalendar(month, year);
    }

    // Generar los días del calendario
    function generateCalendar(month, year) {
    calendarDates.innerHTML = ""; // Limpiar el calendario

    // Obtener el primer y último día del mes
    let firstDay = new Date(year, month).getDay();
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    // Rellenar los días vacíos hasta el primer día del mes
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("date");
        calendarDates.appendChild(emptyCell);
    }

    // Rellenar los días del mes
    for (let day = 1, ctnDay = 0, ctnWeeks = 0; day <= daysInMonth; day++, ctnDay++,  ctnWeeks++) {
        const dateCell = document.createElement("div");
        dateCell.setAttribute('id', `showModalConsult`);
        dateCell.textContent = day;
        ctnDay = ctnDay === days.length ? 0 : ctnDay;

        dateCell.style['grid-area'] = 1 / 7;
        dateCell.classList.add("date");

        // Resaltar el día de hoy
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dateCell.classList.add("today");
        }

        calendarDates.append(dateCell);
    }
    }

    // Manejadores de eventos para los botones de navegación
    prevMonthBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar(currentMonth, currentYear);
    });

    nextMonthBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar(currentMonth, currentYear);
    });

    // Inicializar el calendario con el mes actual
    updateCalendar(currentMonth, currentYear);

}

export { calendar };