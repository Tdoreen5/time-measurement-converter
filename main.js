// Store conversion in local storage
function saveConversionHistory(timeValue, fromUnit, toUnit, result) {
    const conversionHistory = JSON.parse(localStorage.getItem('conversionHistory')) || [];
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
  
