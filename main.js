function currentDate() {
    var date = new Date();
    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    var currentNameMonth = months[date.getMonth()];
    var numberOfCurrentMonth = date.getMonth();
    var currentYear = date.getFullYear();
    var currentWeekDay = days[date.getDay()];
    var currentDay = date.getDate();
    document.getElementById("currentMonth").innerHTML = currentNameMonth;
    document.getElementById("currentYear").innerHTML = currentYear;
    return {
        getCurrentNameMonth: function() {
            return currentNameMonth;
        },
        getNumberOfCurrentMonth: function() {
            return numberOfCurrentMonth;
        },
        getCurrentYear: function() {
            return currentYear;
        },
        getCurrentWeekDay: function() {
            return currentWeekDay;
        },
        getCurrentDay: function() {
            return currentDay;
        }
    };
}

function getNameOfFirstDayOfTheMonth(month, year) {
    // Sunday - Saturday : 0 - 6
    return new Date(`${month} 1, ${year}`).getDay();
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function createDaysForCurrentMonth() {
    const current = new currentDate();
    const currentDay = current.getCurrentDay();
    const currentNameMonth = current.getCurrentNameMonth();
    const numberOfCurrentMonth = current.getNumberOfCurrentMonth();
    const currentYear = current.getCurrentYear();
    const nameOfFirstDay = getNameOfFirstDayOfTheMonth(
        currentNameMonth,
        currentYear
    );
    var numberOfDaysInCurrentMonth = daysInMonth(
        numberOfCurrentMonth + 1,
        currentYear
    );
    // Create empty list item to get the right position for the first day of the month
    for (let i = 0; i < nameOfFirstDay; i++) {
        const listItem = document.createElement("li");
        listItem.classList.add("calendar__day");
        const calendarDays = document.getElementById("calendardays");
        calendarDays.appendChild(listItem);
    }
    // Loop to create the good number of days in the current month
    for (let i = 1; i < numberOfDaysInCurrentMonth + 1; i++) {
        const listItem = document.createElement("li");
        const spanForNumber = document.createElement("span");
        listItem.appendChild(spanForNumber);
        listItem.classList.add("calendar__day");
        const textNode = document.createTextNode(i);
        spanForNumber.appendChild(textNode);
        const calendarDays = document.getElementById("calendardays");
        calendarDays.appendChild(listItem);
        /* Add active class to current day */
        if (currentDay == i) {
            listItem.classList.add("active");
        }
    }
}

let selectedMonth = 0;
function getPreviousOrNextMonth() {
    const current = new currentDate();
    const previousButton = document.getElementById("previousMonth");
    const nextButton = document.getElementById("nextMonth");
    const numberOfCurrentMonth = current.getNumberOfCurrentMonth();
    let count = 1;
    previousButton.addEventListener("click", function() {
        --count;
        selectedMonth = numberOfCurrentMonth + count;
        console.log(selectedMonth);
        createPreviousOrNextMonth();
        return selectedMonth;
    });
    nextButton.addEventListener("click", function() {
        ++count;
        selectedMonth = numberOfCurrentMonth + count;
        console.log(selectedMonth);
        createPreviousOrNextMonth();
        return selectedMonth;
    });
}
function createPreviousOrNextMonth() {
    const current = new currentDate();
    const currentYear = current.getCurrentYear();
    // Trouver une façon d'incrémenter le nom du mois pour passer la valeur a getNameOfFirstDayOfTheMonth()
    //const currentNameMonth = current.getCurrentNameMonth();
    /* const nameOfFirstDay = getNameOfFirstDayOfTheMonth(
		selectedNameMonth,
		currentYear
	); */
    var numberOfDaysInCurrentMonth = daysInMonth(selectedMonth, currentYear);
    const calendarContainer = document.getElementById("calendarContainer");
    const calendar = document.createElement("ul");
    calendar.classList.add("calendar__days");
    calendarContainer.appendChild(calendar);
    // Create empty list item to get the right position for the first day of the month
    /* for (let i = 0; i < nameOfFirstDay; i++) {
		const listItem = document.createElement("li");
		listItem.classList.add("calendar__day");
		const calendarDays = document.getElementById("calendardays");
		calendarDays.appendChild(listItem);
	} */
    for (let i = 1; i < numberOfDaysInCurrentMonth + 1; i++) {
        const listItem = document.createElement("li");
        calendar.appendChild(listItem);
        const spanForNumber = document.createElement("span");
        listItem.appendChild(spanForNumber);
        listItem.classList.add("calendar__day");
        const textNode = document.createTextNode(i);
        spanForNumber.appendChild(textNode);
    }
}

createDaysForCurrentMonth();

getPreviousOrNextMonth();
