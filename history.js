// Load conversion history from localStorage
function loadHistoryPage() {
    const history = JSON.parse(localStorage.getItem('conversionHistory')) || [];
    const historyContainer = document.getElementById('historyContainer');
    historyContainer.innerHTML = '';

    if (history.length === 0) {
        historyContainer.innerHTML = '<p>No conversion history available.</p>';
    } else {
        let historyTable = `<table><tr><th>Input</th><th>From Unit</th><th>To Unit</th><th>Result</th><th>Timestamp</th></tr>`;
        history.forEach(conversion => {
            historyTable += `
                <tr>
                    <td>${conversion.inputValue}</td>
                    <td>${conversion.fromUnit}</td>
                    <td>${conversion.toUnit}</td>
                    <td>${conversion.resultValue}</td>
                    <td>${conversion.timestamp}</td>
                </tr>
            `;
        });
        historyTable += '</table>';
        historyContainer.innerHTML = historyTable;
    }
}

document.addEventListener("DOMContentLoaded", loadHistoryPage);
