import LabeledInput from './LabeledInput';
import ActionButton from './ActionButton';
export default function Register() {
    const handleClick = (buttonText) => {
        alert(`Button "${buttonText}" clicked!`);
    };
    return (
        <div className="bg-white p-8 rounded shadow-md w-96 justify-self-center justify-items-center mx-auto my-16">
            <form id="loginForm" method="post">
                <LabeledInput label="Username" type="text"></LabeledInput>
                <LabeledInput label="Email" type="text"></LabeledInput>
                <LabeledInput label="Password" type="password"></LabeledInput>
                <LabeledInput label="Confirm Password" type="password"></LabeledInput>
                <LabeledInput label="Date of Birth" type="date"></LabeledInput>
                <ActionButton text="Register" 
                backgroundColor="CornflowerBlue" onClick={() => 
                handleClick("Register")} />
            </form>
        </div>
    );

}
