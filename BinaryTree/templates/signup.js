document.addEventListener('DOMContentLoaded', () => {
    const githubButton = document.getElementById('github');
    const loginButton = document.getElementById('login');
    const signUpButton = document.getElementById('signup');
    const contactButton = document.getElementById('contact');
    const signUpFormButton = document.getElementById('btn_signup');
  
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
  
    signUpFormButton.addEventListener('click', () => {
      const name = document.getElementById('user_name').value;
      const email = document.getElementById('user_email').value;
      const user_id = document.getElementById('user_id').value;
      const password = document.getElementById('user_pw').value;
      const password_confirm = document.getElementById('user_pw_confirm').value;
  
      if (!name.length || !email.length || !user_id.length || !password.length || !password_confirm.length) {
        alert('Please fill out all fields');
        return;
      }
  
      if (password !== password_confirm) {
        alert('Passwords do not match');
        return;
      }
  
      // 로컬 스토리지에 사용자 정보 저장
      const user = {
        'Name': name,
        'Email': email,
        'ID': user_id,
        'PW': password
      };
  
      localStorage.setItem('signup', JSON.stringify(user));
      alert('Signup successful! You can now login.');
      window.location.href = 'login.html'; // 로그인 페이지로 이동
    });
  });
  