import LabeledInput from './LabeledInput';
import ActionButton from './ActionButton';
import { useState, useRef } from 'react';
export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const userRef = useRef(null);
    const passRef = useRef(null);
    const handleChange = (val, e) => {
        if(val === "pass") setPassword(e.target.value);
        else setUsername(e.target.value);
        };
    const handleLogin = (e) => {
        e.preventDefault();
        if (username.trim() === "" || password.trim() === "") {
            setError("Please enter both username and password.");
            return;
        }
        sessionStorage.setItem("currentUser", JSON.stringify({username}));
        const users = JSON.parse(sessionStorage.getItem("users")) || [];
        
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
        setSuccess(`Welcome ${username}! You are logged in.`);
            setError("");
            sessionStorage.setItem("currentUser", JSON.stringify(user));
            setUsername("");
            setPassword("");
            userRef.current.value = "";
            passRef.current.value = "";
        } else {
            setError("Invalid username or password.");
            setSuccess("");
        }
    };

    return (
        <div className="bg-white p-8 rounded shadow-md w-96 justify-self-center justify-items-center mx-auto my-16 dark:bg-zinc-700">
            <form id="loginForm" method="post" onSubmit={(e) => handleLogin(e)}>
                <LabeledInput label="Username" type="text" ref={userRef} value={username} onChange={(e)=>handleChange("",e)}></LabeledInput>
                <LabeledInput label="Password" type="password" ref={passRef} value={password} onChange={(e) => handleChange("pass",e)}></LabeledInput>
                <ActionButton text="Login" type="submit" onClick={(e) => handleLogin(e)}></ActionButton>
                {error && (<p style={{ color: "red", fontSize: "14px" }}> {error}</p> )}
                {success && (<p style={{ color: "green", fontSize: "14px" }}> {success}</p> )}
            </form>
        </div>
    );

}
