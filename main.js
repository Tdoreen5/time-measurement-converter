// main.js

// Function to save a new conversion to history
function saveToHistory(inputValue, fromUnit, toUnit, resultValue) {
    let history = JSON.parse(localStorage.getItem('conversionHistory')) || [];
    
    const conversion = {
      inputValue,
      fromUnit,
      toUnit,
      resultValue,
      timestamp: new Date().toLocaleString()
    };
  
    history.push(conversion);
    localStorage.setItem('conversionHistory', JSON.stringify(history));
  }
  
  // Example usage: saving a conversion
  saveToHistory(2, 'hours', 'minutes', 120);
  
