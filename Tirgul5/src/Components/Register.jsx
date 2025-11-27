import LabeledInput from './LabeledInput';
import ActionButton from './ActionButton';
import Captcha from './Captch';
import { useState } from 'react';
export default function Register() {
    const [captchaPassed, setCaptchaPassed] = useState(false);
    const handleClick = (buttonText) => {
        if (!captchaPassed) {
            alert('Please complete the captcha');
            return;
        }
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
                <Captcha onValidate={(ok) => setCaptchaPassed(ok)} />
                <ActionButton text="Register" 
                backgroundColor="CornflowerBlue" disabled={!captchaPassed} onClick={() => 
                handleClick("Register")} />
            </form>
        </div>
    );

}
