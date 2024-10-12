// Your code here
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array) {
    return array.map(element => createEmployeeRecord(element));
}

function createTimeInEvent(employeeRecord, dateTime) {
    const [date, hour] = dateTime.split(" ");
    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    };
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTime) {
    const [date, hour] = dateTime.split(" ");
    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    };
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    let timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    let timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
    const wages = employeeRecord.timeInEvents.map(event => {
        return wagesEarnedOnDate(employeeRecord, event.date);
    });
    return wages.reduce((total, wage) => total + wage, 0);
}
function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
}

