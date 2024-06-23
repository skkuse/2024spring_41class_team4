document.getElementById('btn_run').addEventListener('click', function () {
    const inputCode = document.getElementById('inputCode').value;
    const user = JSON.parse(localStorage.getItem('signin'));

    if (!user) {
        alert('Please log in first.');
        window.location.href = 'login.html';
        return;
    }

    if (inputCode.trim() === "") {
        alert('Please enter some code to analyze.');
        return;
    }

    // Simulate code analysis and improvement suggestion
    setTimeout(() => {
        const originalCarbonEmission = (Math.random() * 100).toFixed(2);
        const improvedCarbonEmission = (originalCarbonEmission - Math.random() * 10).toFixed(2);
        const executionResult = "Execution result here"; // Simulated execution result
        const outputResults = document.getElementById('outputResults');

        outputResults.innerHTML = `
            <div class="output-item"><span class="output-label">Original Code:</span> <button class="show-code-btn" onclick="showCode('${inputCode}')">Show Code</button></div>
            <div class="output-item"><span class="output-label">Original Carbon Emission:</span> ${originalCarbonEmission}g CO2</div>
            <div class="output-item"><span class="output-label">Improved Code:</span> <button class="show-code-btn" onclick="showCode('${inputCode.replace(/foo/g, 'bar')}')">Show Code</button></div>
            <div class="output-item"><span class="output-label">Improved Carbon Emission:</span> ${improvedCarbonEmission}g CO2</div>
            <div class="output-item"><span class="output-label">Reduction:</span> ${(originalCarbonEmission - improvedCarbonEmission).toFixed(2)}g CO2</div>
            <div class="output-item"><span class="output-label">Execution Result:</span> ${executionResult}</div>
            <button class="view-ranking-btn" onclick="viewRanking()">View Ranking</button>
        `;

        // Save the results to local storage
        const latestResult = {
            ID: user.ID,
            EMAIL: user.EMAIL,
            CARBON: (originalCarbonEmission - improvedCarbonEmission).toFixed(2),
            LEVEL: getLevel(originalCarbonEmission - improvedCarbonEmission),
            TOTAL_EMISSION: (parseFloat(localStorage.getItem('totalEmission')) || 0) + parseFloat((originalCarbonEmission - improvedCarbonEmission).toFixed(2))
        };

        localStorage.setItem('latestResult', JSON.stringify(latestResult));
        localStorage.setItem('totalEmission', latestResult.TOTAL_EMISSION);
    }, 1000);
});

function showCode(code) {
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`<pre>${code}</pre>`);
    newWindow.document.close();
    newWindow.document.execCommand('copy');
    alert('Code copied to clipboard');
}

function viewRanking() {
    window.location.href = 'ranking.html';
}

function getLevel(reduction) {
    if (reduction >= 80) return 10;
    if (reduction >= 70) return 9;
    if (reduction >= 60) return 8;
    if (reduction >= 50) return 7;
    if (reduction >= 40) return 6;
    if (reduction >= 30) return 5;
    if (reduction >= 20) return 4;
    if (reduction >= 10) return 3;
    if (reduction > 0) return 2;
    return 1;
}

document.getElementById('contact').addEventListener('click', function () {
    alert('Team 4 Members:\n나인호, 이승환, 구성현, 오성현');
});

document.getElementById('github').addEventListener('click', function () {
    window.location.href = 'https://github.com/skkuse/2024spring_41class_team4/tree/main';
});

document.getElementById('profile').addEventListener('click', function () {
    window.location.href = 'profile.html'; 
});

document.getElementById('logout').addEventListener('click', function () {
    localStorage.removeItem('signin');
    alert('Logged out successfully.');
    window.location.href = 'index.html'; 
});
