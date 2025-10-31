const html = document.documentElement;
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');
loginForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    const usernameOrEmail = document.getElementById('userInput').value;
    const password = document.getElementById('passInput').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    let user = users.find(u=>u.username === usernameOrEmail || u.email === usernameOrEmail);

    let nameOrEmail = 'test';
    let pass = 'password';

    if(user!=undefined){
        nameOrEmail = user.username;
        pass = user.password;
    }
    if(usernameOrEmail === nameOrEmail && password === pass){
        loginMessage.textContent = 'Login successful!';
        loginMessage.classList.remove('text-red-500');
        loginMessage.classList.add('text-green-500');
        localStorage.setItem('currentUser', nameOrEmail);
        if(user.isAdmin){
            window.location.href = "userManagement.html";
        }
    }else{
        loginMessage.textContent = 'Invalid username/email or password.';
        loginMessage.classList.remove('text-green-500');
        loginMessage.classList.add('text-red-500');
    }
});

