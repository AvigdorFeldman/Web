import LabeledInput from './LabeledInput';
import ActionButton from './ActionButton';
import { useState, useRef } from 'react';
export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [dob, setDob] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const userRef = useRef(null);
    const passRef = useRef(null);
    const emailRef = useRef(null);
    const confirmPassRef = useRef(null);
    const dobRef = useRef(null);
    const handleChange = (val, e) => {
        if(val === "pass") setPassword(e.target.value);
        else setUsername(e.target.value);
        };
    const handleLogin = (e) => {
        e.preventDefault();
        if (username.trim() === "" || password.trim() === "" || email.trim() === "" || confirmPassword.trim() === "" || dob.trim() === "") {
            setError("Please enter All Fields.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setSuccess("");
            return;
        }
        let users = JSON.parse(sessionStorage.getItem("users")) || [];
        if (users.find(u => u.username === username)) {
            setError("Username already exists.");
            setSuccess("");
            return;
        }
        users.push({ username, password, email, dob });
        sessionStorage.setItem("users", JSON.stringify(users));
        setSuccess("Registration successful! You can now log in.");
        sessionStorage.setItem("currentUser", JSON.stringify({username}));
        setUsername("");
        setPassword("");
        setEmail("");
        setConfirmPassword("");
        setDob("");
        setError("");
        userRef.current.value = "";
        passRef.current.value = "";
        emailRef.current.value = "";
        confirmPassRef.current.value = "";
        dobRef.current.value = "";
        setSuccess("User registered successfully!");
    };

    return (
        <div className="bg-white p-8 rounded shadow-md w-96 justify-self-center justify-items-center mx-auto my-16 dark:bg-zinc-700">
            <form id="loginForm" method="post" onSubmit={(e) => handleLogin(e)}>
                <LabeledInput label="Username" type="text" ref={userRef} value={username} onChange={(e)=>handleChange("",e)}></LabeledInput>
                <LabeledInput label="Email" type="email" ref={emailRef} value={email} onChange={(e) => setEmail(e.target.value)}></LabeledInput>
                <LabeledInput label="Password" type="password" ref={passRef} value={password} onChange={(e) => handleChange("pass",e)}></LabeledInput>
                <LabeledInput label="Confirm Password" type="password" ref={confirmPassRef} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></LabeledInput>
                <LabeledInput label="Date of Birth" type="date" ref={dobRef} value={dob} onChange={(e) => setDob(e.target.value)}></LabeledInput>
                <ActionButton text="Register" type="submit" onClick={(e) => handleLogin(e)}></ActionButton>
                {error && (<p style={{ color: "red", fontSize: "14px" }}> {error}</p> )}
                {success && (<p style={{ color: "green", fontSize: "14px" }}> {success}</p> )}
            </form>
        </div>
    );

}
