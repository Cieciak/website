const MONTHS = new Map([
    [ 0, "STY",],
    [ 1, "LUT",],
    [ 2, "MAR",],
    [ 3, "KWI",],
    [ 4, "MAJ",],
    [ 5, "CZE",],
    [ 6, "LIP",],
    [ 7, "SIE",],
    [ 8, "WRZ",],
    [ 9, "PAŹ",],
    [10, "LIS",],
    [11, "GRU",],
])

var editMode = false;
var timeSource = "now";
var customDate = zeroTime();
var timezone = "Z";

function getMapKeyByValue(map, target) {
    for (let [key, val] of map.entries()) {
        if (val == target) {return key;}
    }
    return undefined;
}

function getTime() {
    if (timeSource == "now") {return new Date();}
    else if (timeSource == "custom") {return customDate}
}

function zeroTime() {
    var date = new Date();

    date.setFullYear(0);
    date.setMonth(0);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
}

function getTimeStr() {
    const now = getTime();

    const day = now.getDate().toString().padStart(2, "0");
    const hour = now.getHours().toString().padStart(2, "0");
    const minute = now.getMinutes().toString().padStart(2, "0");
    const month = MONTHS.get(now.getMonth());
    const year = now.getFullYear().toString().slice(-2);

    return day + hour + minute + timezone + month + year;
}

function enterEditMode() {
    editMode = true;
}

function exitEditMode() {

    const day = +document.getElementById("time-display").innerHTML.slice(0, 2);
    const hour = +document.getElementById("time-display").innerHTML.slice(2, 4);
    const minute = +document.getElementById("time-display").innerHTML.slice(4, 6);
    timezone = document.getElementById("time-display").innerHTML.slice(6, 7);
    const month = getMapKeyByValue(MONTHS, document.getElementById("time-display").innerHTML.slice(7,10));
    const year = 2000 + +document.getElementById("time-display").innerHTML.slice(10, 12)

    console.log(day, hour, minute, timezone, month, year);

    customDate.setDate(day);
    customDate.setHours(hour);
    customDate.setMinutes(minute);
    customDate.setMonth(month);
    customDate.setFullYear(year)

    editMode = false;
    timeSource = "custom";
}

function setTime() {
    if (editMode == false) {
        document.getElementById("time-display").innerHTML = getTimeStr();
    } else {
        return;
    }
}

function init() {
    document.getElementById("time-display").innerHTML = getTimeStr()

    setInterval(setTime, 1000);
    setInterval(() => {customDate.setSeconds(customDate.getSeconds() + 1);}, 1000)
}