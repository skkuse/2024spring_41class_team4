document.getElementById('btn_run').addEventListener('click', function () {
    const inputCode = document.getElementById('inputCode').value;

    // Here we would normally send the code to the server for processing
    // For this example, we'll just simulate the processing
    const outputResults = document.getElementById('outputResults');

    if (inputCode.trim() === "") {
        outputResults.innerHTML = "<p>Please enter some code to analyze.</p>";
        return;
    }

    // Simulate code analysis and improvement suggestion
    setTimeout(() => {
        const originalCarbonEmission = (Math.random() * 100).toFixed(2);
        const improvedCarbonEmission = (originalCarbonEmission - Math.random() * 10).toFixed(2);
        outputResults.innerHTML = `
            <p><strong>Original Code:</strong></p>
            <pre>${inputCode}</pre>
            <p><strong>Original Carbon Emission:</strong> ${originalCarbonEmission}g CO2</p>
            <p><strong>Improved Code:</strong></p>
            <pre>${inputCode.replace(/foo/g, 'bar')}</pre>
            <p><strong>Improved Carbon Emission:</strong> ${improvedCarbonEmission}g CO2</p>
            <p><strong>Reduction:</strong> ${(originalCarbonEmission - improvedCarbonEmission).toFixed(2)}g CO2</p>
        `;
    }, 1000);
});

document.getElementById('contact').addEventListener('click', function () {
    alert('Team 4 Members:\n나인호, 이승환, 구성현, 오성현');
});

document.getElementById('github').addEventListener('click', function () {
    window.location.href = 'https://github.com/skkuse/2024spring_41class_team4/tree/main';
});

document.getElementById('profile').addEventListener('click', function () {
    window.location.href = 'profile.html'; // Adjust the path as needed
});

document.getElementById('logout').addEventListener('click', function () {
    // 로그아웃 처리
    localStorage.removeItem('signin');
    alert('Logged out successfully.');
    window.location.href = 'index.html'; // Adjust the path as needed
});
