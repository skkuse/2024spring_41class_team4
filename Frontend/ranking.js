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
      { id: 'user1', carbonReduction: 50 },
      { id: 'user2', carbonReduction: 40 },
      { id: 'user3', carbonReduction: 30 },
      { id: 'user4', carbonReduction: 20 },
      { id: 'user5', carbonReduction: 10 }
    ];
  
    const rankTable = document.getElementById('rank_table').getElementsByTagName('tbody')[0];
  
    rankData.forEach((user, index) => {
      const row = rankTable.insertRow();
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);
      cell1.innerHTML = index + 1;
      const btn = document.createElement('button');
      btn.className = 'btn';
      btn.textContent = user.id;
      btn.id = user.id;
      btn.addEventListener('click', () => {
        let profile = {
          ID: user.id,
          CARBON: user.carbonReduction,
          LEVEL: getLevel(user.carbonReduction)
        };
        localStorage.setItem('profile', JSON.stringify(profile));
        window.location.href = 'profile.html';
      });
      cell2.appendChild(btn);
      cell3.innerHTML = getLevel(user.carbonReduction);
      cell4.innerHTML = user.carbonReduction;
    });
  
    const btnSearch = document.getElementById('btn_search');
    const searchItem = document.getElementById('search_item');
    let target = 'id';
  
    btnSearch.addEventListener('click', () => {
      const searchData = document.getElementById('data_searched').value.toLowerCase();
      const filteredData = rankData.filter(user => user[target].toString().toLowerCase().includes(searchData));
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
        btn.textContent = user.id;
        btn.id = user.id;
        btn.addEventListener('click', () => {
          let profile = {
            ID: user.id,
            CARBON: user.carbonReduction,
            LEVEL: getLevel(user.carbonReduction)
          };
          localStorage.setItem('profile', JSON.stringify(profile));
          window.location.href = 'profile.html';
        });
        cell2.appendChild(btn);
        cell3.innerHTML = getLevel(user.carbonReduction);
        cell4.innerHTML = user.carbonReduction;
      });
    });
  
    document.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', (event) => {
        searchItem.innerText = event.target.innerText;
        target = event.target.id.toLowerCase();
      });
    });
  
    function updateRanking(newUser) {
      rankData.push(newUser);
      rankData.sort((a, b) => b.carbonReduction - a.carbonReduction);
      rankTable.innerHTML = '';
      rankData.forEach((user, index) => {
        const row = rankTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        cell1.innerHTML = index + 1;
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.textContent = user.id;
        btn.id = user.id;
        btn.addEventListener('click', () => {
          let profile = {
            ID: user.id,
            CARBON: user.carbonReduction,
            LEVEL: getLevel(user.carbonReduction)
          };
          localStorage.setItem('profile', JSON.stringify(profile));
          window.location.href = 'profile.html';
        });
        cell2.appendChild(btn);
        cell3.innerHTML = getLevel(user.carbonReduction);
        cell4.innerHTML = user.carbonReduction;
      });
    }
  
    function getLevel(carbonReduction) {
      if (carbonReduction >= 50) return 12;
      if (carbonReduction >= 45) return 11;
      if (carbonReduction >= 40) return 10;
      if (carbonReduction >= 35) return 9;
      if (carbonReduction >= 30) return 8;
      if (carbonReduction >= 25) return 7;
      if (carbonReduction >= 20) return 6;
      if (carbonReduction >= 15) return 5;
      if (carbonReduction >= 10) return 4;
      if (carbonReduction >= 5) return 3;
      if (carbonReduction > 0) return 2;
      return 1;
    }
  
    const userCarbonReduction = 25; // 임의의 값으로 설정
    updateRanking({ id: user.ID, carbonReduction: userCarbonReduction });
  });
  