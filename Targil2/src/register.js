const html = document.documentElement;
const registerForm = document.getElementById('registerForm');
const registerMessage = document.getElementById('registerMessage');
let isAdmin;
registerForm.addEventListener('submit',async(event)=>{
    event.preventDefault();
    const username = document.getElementById('userInput').value;
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passInput').value;
    const confirmPassword = document.getElementById('confirmInput').value;
    const dob = document.getElementById('dateInput').value;

    registerMessage.textContent = "";

    if(password !== confirmPassword){
        registerMessage.textContent = "Passwords do not match.";
        registerMessage.classList.remove("text-green-500");
        registerMessage.classList.add("text-red-500");
        return;
    }

    try{
        let users = JSON.parse(localStorage.getItem('users')) || []
        if(users.some(user=>user.username === username || user.email === email)){
            registerMessage.textContent = "Username or email already exists.";
            registerMessage.classList.remove("text-green-500");
            registerMessage.classList.add("text-red-500");
        }
        if(users && users.length==0){
            isAdmin = true;
        }else{
            isAdmin = false;
        }
        users.push({username:username, email:email, password:password, dob:dob, isAdmin:isAdmin});

        localStorage.setItem('users', JSON.stringify(users));

        registerMessage.textContent = "Registration successful! (Data stored in local storage)";
        registerMessage.classList.remove("text-red-500");
        registerMessage.classList.add("text-green-500");
    }catch(error){
        registerMessage.textContent = "An error occured during registration.";
        registerMessage.classList.remove("text-green-500");
        registerMessage.classList.add("text-red-500");
    }
});

