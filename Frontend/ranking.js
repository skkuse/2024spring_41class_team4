document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('signin'));

    if (!user) {
        alert('Please log in first.');
        window.location.href = 'login.html';
    }

    const logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('signin');
        alert('Logged out successfully.');
        window.location.href = 'index.html';
    });

    const contactButton = document.getElementById('contact');
    contactButton.addEventListener('click', () => {
        alert('Team 4 Members:\n나인호, 이승환, 구성현, 오성현');
    });

    const githubButton = document.getElementById('github');
    githubButton.addEventListener('click', () => {
        window.location.href = 'https://github.com/skkuse/2024spring_41class_team4/tree/main';
    });

    const profileButton = document.getElementById('profile');
    profileButton.addEventListener('click', () => {
        window.location.href = 'profile.html';
    });

    const rankData = [
        { ID: 'user1', CARBON: 50 },
        { ID: 'user2', CARBON: 40 },
        { ID: 'user3', CARBON: 30 },
        { ID: 'user4', CARBON: 20 },
        { ID: 'user5', CARBON: 10 }
    ];

    // Add the latest result from localStorage to rankData
    const latestResult = JSON.parse(localStorage.getItem('latestResult'));
    if (latestResult) {
        rankData.push({
            ID: latestResult.ID,
            CARBON: parseFloat(latestResult.CARBON)
        });
    }

    const rankTable = document.getElementById('rank_table').getElementsByTagName('tbody')[0];

    rankData.sort((a, b) => b.CARBON - a.CARBON);

    rankData.forEach((user, index) => {
        const row = rankTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        cell1.innerHTML = index + 1;
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.textContent = user.ID;
        btn.id = user.ID;
        btn.addEventListener('click', () => {
            let profile = {
                ID: user.ID,
                CARBON: user.CARBON,
                LEVEL: getLevel(user.CARBON)
            };
            localStorage.setItem('profile', JSON.stringify(profile));
            window.location.href = 'profile.html';
        });
        cell2.appendChild(btn);
        cell3.innerHTML = getLevel(user.CARBON);
        cell4.innerHTML = user.CARBON;
    });

    const btnSearch = document.getElementById('btn_search');
    const searchItem = document.getElementById('search_item');
    let target = 'ID';

    btnSearch.addEventListener('click', () => {
        const searchData = document.getElementById('data_searched').value.toLowerCase();
        let filteredData = [];
        if (target === 'ID') {
            filteredData = rankData.filter(user => user[target].toString().toLowerCase().includes(searchData));
        } else if (target === 'LEVEL') {
            const level = parseInt(searchData);
            filteredData = rankData.filter(user => getLevel(user.CARBON) === level);
        }
        rankTable.innerHTML = '';
        filteredData.forEach((user, index) => {
            const row = rankTable.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            cell1.innerHTML = index + 1;
            const btn = document.createElement('button');
            btn.className = 'btn';
            btn.textContent = user.ID;
            btn.id = user.ID;
            btn.addEventListener('click', () => {
                let profile = {
                    ID: user.ID,
                    CARBON: user.CARBON,
                    LEVEL: getLevel(user.CARBON)
                };
                localStorage.setItem('profile', JSON.stringify(profile));
                window.location.href = 'profile.html';
            });
            cell2.appendChild(btn);
            cell3.innerHTML = getLevel(user.CARBON);
            cell4.innerHTML = user.CARBON;
        });
    });

    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (event) => {
            searchItem.innerText = event.target.innerText;
            target = event.target.id.toUpperCase();
            if (target === 'LEVEL') searchItem.innerText = 'LV';
        });
    });

    function getLevel(carbonReduction) {
        if (carbonReduction >= 80) return 10;
        if (carbonReduction >= 70) return 9;
        if (carbonReduction >= 60) return 8;
        if (carbonReduction >= 50) return 7;
        if (carbonReduction >= 40) return 6;
        if (carbonReduction >= 30) return 5;
        if (carbonReduction >= 20) return 4;
        if (carbonReduction >= 10) return 3;
        if (carbonReduction > 0) return 2;
        return 1;
    }
});

function viewCodeInput() {
    window.location.href = 'code_input.html';
}
