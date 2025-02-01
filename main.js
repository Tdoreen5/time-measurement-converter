let isDarkTheme = false;

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    document.querySelector('.theme-toggle').textContent = isDarkTheme ? 'Light Theme' : 'Dark Theme';
}

// Store conversion in local storage
function saveConversionHistory(timeValue, fromUnit, toUnit, result) {
    if (!timeValue || !fromUnit || !toUnit || !result) {
        console.error("Invalid conversion data!");
        return; // Prevent storing invalid data
    }

    let conversionHistory = JSON.parse(localStorage.getItem('conversionHistory')) || [];

    const conversion = {
        timeValue,
        fromUnit,
        toUnit,
        result,
        date: new Date().toLocaleString()
    };

    conversionHistory.push(conversion);
    localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));
}

// Conversion logic
function convertTime() {
    const timeValue = document.getElementById('timeValue').value;
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    let result;

    // Conversion factors (seconds as base unit)
    const conversionFactors = {
        seconds: 1,
        minutes: 60,
        hours: 3600,
        days: 86400,
        weeks: 604800,
        months: 2629746,  // Average seconds in a month (30.44 days)
        years: 31556952  // Average seconds in a year
    };

    // Convert the value to seconds first, then to the target unit
    const valueInSeconds = timeValue * conversionFactors[fromUnit];
    const convertedValue = valueInSeconds / conversionFactors[toUnit];
    result = `${timeValue} ${fromUnit} is equal to ${convertedValue.toFixed(2)} ${toUnit}.`;

    document.getElementById('result').textContent = result;
    document.getElementById('downloadBtn').style.display = 'inline';

    // Save conversion to history
    saveConversionHistory(timeValue, fromUnit, toUnit, result);
}

// Download result function
function downloadResult() {
    const resultText = document.getElementById('result').textContent;
    const blob = new Blob([resultText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'conversion-result.txt';
    link.click();
}

// New component: Custom Time Units (for managing user-defined units)
function addCustomUnit() {
    const unitName = document.getElementById('customUnitName').value;
    const unitFactor = parseFloat(document.getElementById('customUnitFactor').value);

    if (unitName && !isNaN(unitFactor)) {
        let customUnits = JSON.parse(localStorage.getItem('customUnits')) || [];
        customUnits.push({ unitName, unitFactor });
        localStorage.setItem('customUnits', JSON.stringify(customUnits));
        loadCustomUnits(); // Reload the list
    } else {
        alert('Please provide a valid unit name and conversion factor.');
    }
}

function loadCustomUnits() {
    const customUnitsList = document.getElementById('customUnitsList');
    customUnitsList.innerHTML = ''; // Clear existing list

    const customUnits = JSON.parse(localStorage.getItem('customUnits')) || [];
    customUnits.forEach(unit => {
        const li = document.createElement('li');
        li.innerHTML = `${unit.unitName}: ${unit.unitFactor} seconds`;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = function() {
            deleteCustomUnit(unit.unitName);
        };
        li.appendChild(deleteBtn);
        customUnitsList.appendChild(li);
    });
}

function deleteCustomUnit(unitName) {
    let customUnits = JSON.parse(localStorage.getItem('customUnits')) || [];
    customUnits = customUnits.filter(unit => unit.unitName !== unitName);
    localStorage.setItem('customUnits', JSON.stringify(customUnits));
    loadCustomUnits(); // Reload the list after deletion
}

// New component: World Time Converter
function convertToWorldTime() {
    const timeValue = document.getElementById('worldTimeValue').value;
    const selectedTimezone = document.getElementById('worldTimeZone').value;

    const timezones = {
        "GMT": 0,
        "EST": -5,
        "PST": -8,
        "CET": 1,
        "IST": 5.5
    };

    if (timezones[selectedTimezone] !== undefined) {
        const offset = timezones[selectedTimezone];
        const convertedTime = new Date(new Date().getTime() + (offset * 60 * 60 * 1000));
        document.getElementById('convertedWorldTime').textContent = `${timeValue} is ${convertedTime.toLocaleString()} in ${selectedTimezone}.`;
    } else {
        alert('Invalid timezone selection');
    }
}

// Initializing the app and loading custom units on page load
window.onload = function() {
    loadCustomUnits(); // Load custom time units when the page loads
};
