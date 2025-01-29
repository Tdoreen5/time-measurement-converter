let isDarkTheme = false;

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    document.querySelector('.theme-toggle').textContent = isDarkTheme ? 'Light Theme' : 'Dark Theme';
}

// Save conversion history to localStorage
function saveConversionHistory(inputValue, fromUnit, toUnit, resultValue) {
    if (!inputValue || !fromUnit || !toUnit || !resultValue) {
        console.error("Invalid conversion data!");
        return;
    }

    let conversionHistory = JSON.parse(localStorage.getItem('conversionHistory')) || [];

    const conversion = {
      inputValue,
      fromUnit,
      toUnit,
      resultValue,
      timestamp: new Date().toLocaleString()
    };

    conversionHistory.push(conversion);
    localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));
    console.log("History saved:", conversionHistory);
}

// Convert time values
function convertTime() {
    const timeValue = parseFloat(document.getElementById('timeValue').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;

    // Validate input value
    if (isNaN(timeValue) || timeValue <= 0) {
        alert("Please enter a valid positive number.");
        return;
    }

    console.log(`Converting ${timeValue} ${fromUnit} to ${toUnit}`);

    // Conversion factors (seconds as base unit)
    const conversionFactors = {
        seconds: 1,
        minutes: 60,
        hours: 3600,
        days: 86400,
        weeks: 604800
    };

    const valueInSeconds = timeValue * conversionFactors[fromUnit];
    const convertedValue = valueInSeconds / conversionFactors[toUnit];
    const result = `${timeValue} ${fromUnit} is equal to ${convertedValue.toFixed(2)} ${toUnit}.`;

    console.log("Conversion result:", result);

    document.getElementById('result').textContent = result;
    document.getElementById('downloadBtn').style.display = 'inline';

    saveConversionHistory(timeValue, fromUnit, toUnit, result);
}

// Save favorite conversion
function saveFavoriteConversion() {
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    let favoriteConversions = JSON.parse(localStorage.getItem('favoriteConversions')) || [];

    favoriteConversions.push({ fromUnit, toUnit });
    localStorage.setItem('favoriteConversions', JSON.stringify(favoriteConversions));

    alert(`Saved ${fromUnit} to ${toUnit} as a favorite conversion!`);
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
