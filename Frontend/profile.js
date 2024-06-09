document.addEventListener('DOMContentLoaded', () => {
    const signinUser = JSON.parse(localStorage.getItem('signin'));
    const profileUser = JSON.parse(localStorage.getItem('profile'));

    if (!signinUser) {
        alert('Please log in first.');
        window.location.href = 'login.html';
    }

    let user = signinUser;

    if (profileUser && profileUser.ID !== signinUser.ID) {
        user = profileUser;
    }

    document.getElementById('user_id').textContent = user.ID;
    document.getElementById('user_email').textContent = user.EMAIL || 'Not provided';
    document.getElementById('user_level').textContent = `${user.LEVEL} level`;
    document.getElementById('user_total_emission').textContent = `${user.TOTAL_EMISSION || 0} kg`;

    const profileImage = document.getElementById('profile_image');
    const level = user.LEVEL;
    const imagePath = `images/level${level}.jpg`; // Assuming you have images named Level1.png, Level2.png, etc.
    profileImage.src = imagePath;

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
        localStorage.setItem('profile', JSON.stringify(signinUser));
        window.location.href = 'profile.html';
    });
});
