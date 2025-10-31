const html = document.documentElement;
const welcomeUserH1 = document.getElementById('welcomeUserH1');
const userManagementTable = document.getElementById('userManagementTable');
currentUser = localStorage.getItem('currentUser') || "";
welcomeUserH1.textContent = `Welcome ${currentUser}`;
const users = JSON.parse(localStorage.getItem('users')) || [];
userManagementTable.innerHTML += "<tr class='bg-gray-200'><th class='border border-gray-300 px-4 py-2 text-center'>Username</th><th class='border border-gray-300 px-4 py-2 text-center'>Email</th><th class='border border-gray-300 px-4 py-2 text-center'>Date of Birth</th><th class='border border-gray-300 px-4 py-2 text-center'>Is Admin?</th></tr>";
for(const user of users){
    userManagementTable.innerHTML += `<tr><td class='border border-gray-300 px-4 py-2 text-center'>${user.username}</td><td class='border border-gray-300 px-4 py-2 text-center'>${user.email}</td><td class='border border-gray-300 px-4 py-2 text-center'>${user.dob}</td><td class='border border-gray-300 px-4 py-2 text-center'>${user.isAdmin ? "yes" : "no"}</td></tr>`;
}