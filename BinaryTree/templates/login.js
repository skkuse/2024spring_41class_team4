document.addEventListener('DOMContentLoaded', () => {
    const githubButton = document.getElementById('github');
    const loginButton = document.getElementById('login');
    const signUpButton = document.getElementById('signup');
    const contactButton = document.getElementById('contact');
    const loginFormButton = document.getElementById('btn_login');
  
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
  
    loginFormButton.addEventListener('click', () => {
      let input_id = document.getElementById('user_id').value;
      let input_pw = document.getElementById('user_pw').value;
  
      if (!input_id.length) {
        alert('Please Write your ID');
        return;
      }
  
      if (!input_pw.length) {
        alert('Please Write your PW');
        return;
      }
  
      // 로컬 스토리지에서 사용자 정보 확인
      let user = JSON.parse(localStorage.getItem('signup'));
  
      if (user && user.ID === input_id && user.PW === input_pw) {
        // 로그인 성공 시
        localStorage.setItem('signin', JSON.stringify(user));
        window.location.href = 'index.html'; // 처음 페이지로 이동
      } else {
        alert('Invalid ID or Password');
      }
    });
  });
  