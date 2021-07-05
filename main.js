const months = [
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
const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
function currentDate() {
    var date = new Date();
    var currentNameMonth = months[date.getMonth()];
    var numberOfCurrentMonth = date.getMonth();
    var currentYear = date.getFullYear();
    var currentWeekDay = days[date.getDay()];
    var currentDay = date.getDate();
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
    const calendarContainer = document.getElementById("calendarContainer");
    const calendar = document.createElement("ul");
    calendar.classList.add("calendar__days");
    calendar.id = currentNameMonth + "-" + currentYear;
    calendarContainer.appendChild(calendar);
    displayActiveMonthTitle(currentNameMonth, currentYear);
    // Create empty list item to get the right position for the first day of the month
    for (let i = 0; i < nameOfFirstDay; i++) {
        const listItem = document.createElement("li");
        listItem.classList.add("calendar__day");
        calendar.appendChild(listItem);
    }
    // Loop to create the good number of days in the current month
    for (let i = 1; i < numberOfDaysInCurrentMonth + 1; i++) {
        const listItem = document.createElement("li");
        const spanForNumber = document.createElement("span");
        listItem.appendChild(spanForNumber);
        listItem.classList.add("calendar__day");
        const textNode = document.createTextNode(i);
        spanForNumber.appendChild(textNode);
        calendar.appendChild(listItem);
        /* Add active class to current day */
        if (currentDay == i) {
            listItem.classList.add("active");
        }
    }
}

let activeMonthNumber = 0;
let activeMonthName = "";
function getPreviousOrNextMonth() {
    const current = new currentDate();
    const previousButton = document.getElementById("previousMonth");
    const nextButton = document.getElementById("nextMonth");
    let numberOfCurrentMonth = current.getNumberOfCurrentMonth();
    const currentYear = current.getCurrentYear();

    let count = 1;
    previousButton.addEventListener("click", function() {
        --count;
        activeMonthNumber = numberOfCurrentMonth + count;
        activeMonthName = months[numberOfCurrentMonth - 1 + count];
        if (activeMonthNumber <= 1) {
            numberOfCurrentMonth = 12;
            count = 1;
        }
        let activeMonthIdName = activeMonthName + "-" + currentYear;
        let activeMonth = document.getElementById(activeMonthIdName);
        if (document.body.contains(activeMonth)) {
            // activeMonth.classList.add("active");
        } else {
            createPreviousOrNextMonth();
        }
        return activeMonthNumber;
    });
    nextButton.addEventListener("click", function() {
        count++;
        activeMonthName = months[numberOfCurrentMonth - 1 + count];
        activeMonthNumber = numberOfCurrentMonth + count;
        if (activeMonthNumber >= 12) {
            numberOfCurrentMonth = 0;
            count = 0;
        }
        let activeMonthIdName = activeMonthName + "-" + currentYear;
        let activeMonth = document.getElementById(activeMonthIdName);
        if (document.body.contains(activeMonth)) {
            //activeMonth.classList.add("active");
        } else {
            createPreviousOrNextMonth();
        }
        return activeMonthNumber;
    });
}

function createPreviousOrNextMonth() {
    const current = new currentDate();
    const currentYear = current.getCurrentYear();
    const nameOfFirstDay = getNameOfFirstDayOfTheMonth(
        activeMonthName,
        currentYear
    );
    var numberOfDaysInCurrentMonth = daysInMonth(
        activeMonthNumber,
        currentYear
    );
    const calendarContainer = document.getElementById("calendarContainer");
    const calendar = document.createElement("ul");
    const idOfMonth = activeMonthName + "-" + currentYear;
    calendar.classList.add("calendar__days");
    calendar.classList.add("active");
    calendar.id = idOfMonth;
    calendarContainer.appendChild(calendar);
    displayActiveMonthTitle(activeMonthName, currentYear);
    // Create empty list item to get the right position for the first day of the month
    for (let i = 0; i < nameOfFirstDay; i++) {
        const listItem = document.createElement("li");
        listItem.classList.add("calendar__day");
        let activeCalendar = document.getElementById(idOfMonth);
        activeCalendar.appendChild(listItem);
    }
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

function displayActiveMonthTitle(monthName, year) {
    document.getElementById("currentMonth").innerHTML = monthName;
    document.getElementById("currentYear").innerHTML = year;
}

createDaysForCurrentMonth();

getPreviousOrNextMonth();
