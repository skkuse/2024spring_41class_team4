document.addEventListener('DOMContentLoaded', () => {
    const githubButton = document.getElementById('github');
    const loginButton = document.getElementById('login');
    const signUpButton = document.getElementById('signup');
    const contactButton = document.getElementById('contact');
    const startButton = document.getElementById('btn_start');
    const rankingButton = document.getElementById('btn_ranking');
    const navRight = document.getElementById('nav-right');
  
    githubButton.addEventListener('click', () => {
      window.location.href = 'https://github.com/skkuse/2024spring_41class_team4/tree/main';
    });
  
    loginButton.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  
    signUpButton.addEventListener('click', () => {
      window.location.href = 'signup.html';
    });
  
    contactButton.addEventListener('click', () => {
      alert('팀4조 : 나인호, 이승환, 구성현, 오성현');
    });
  
    // 로그인 여부 확인
    const user = JSON.parse(localStorage.getItem('signin'));
  
    if (user) {
      navRight.innerHTML = `
        <li class="nav-item">
          <a class="nav-link" href="#" id="profile">My Profile</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">|</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" id="logout">Log Out</a>
        </li>
      `;
  
      const profileButton = document.getElementById('profile');
      const logoutButton = document.getElementById('logout');
  
      profileButton.addEventListener('click', () => {
        // 프로필 페이지로 이동
        window.location.href = 'profile.html';
      });
  
      logoutButton.addEventListener('click', () => {
        // 로그아웃 처리
        localStorage.removeItem('signin');
        window.location.href = 'index.html';
      });
    }
  
    startButton.addEventListener('click', () => {
      if (user) {
        // 로그인 되어 있을 때 Start 버튼 클릭 시 이동
        window.location.href = 'code_input.html';
      } else {
        alert('Please login first.');
        window.location.href = 'login.html';
      }
    });
  
    rankingButton.addEventListener('click', () => {
      if (user) {
        // 로그인 되어 있을 때 Ranking 버튼 클릭 시 이동
        window.location.href = 'ranking.html';
      } else {
        alert('Please login first.');
        window.location.href = 'login.html';
      }
    });
  });
  