document.addEventListener('DOMContentLoaded', () => {
    const arithmeticChallengeSpan = document.getElementById('arithmetic-challenge');
    const registerForm = document.getElementById('registerForm');
    const registerMessage = document.getElementById('registerMessage');
    let isAdmin = true;
    const arithmeticAnswerInput = document.getElementById('arithmetic-answer');
    const refreshArithmeticCaptchaButton = document.getElementById('refresh-arithmetic-captcha');
    const arithmeticError = document.getElementById('arithmetic-error');
    const captchaAttemptsError = document.getElementById('captcha-attempts-error');
    let arithmeticNum1, arithmeticNum2, arithmeticExpectedAnswer;
    let incorrectAttempts = 0;
    const maxIncorrectAttempts = 3;
    function generateArithmeticCaptcha() {
        if (arithmeticAnswerInput) {
        arithmeticAnswerInput.value = '';  // Clear the input field
         // Exit if the element is not found
    }
	//הגרלת 2 מספרים רנדומלים מ- 1 עד 10
    arithmeticNum1 = Math.floor(Math.random() * 10) + 1;
    arithmeticNum2 = Math.floor(Math.random() * 10) + 1;
	/* אתחול אופרטור חישובי ע”י הגרלת מספר בין 1 ל- 0 ולפי בחירת חיבור 
או חיסור */
    const operation = Math.random() < 0.5 ? '*' : '/';
	//חישוב התוצאה עבור חיבור
    if (operation === '*') {
        arithmeticExpectedAnswer = arithmeticNum1 * arithmeticNum2;
        //הצגת חישוב אריתמטי עם חיבור
        arithmeticChallengeSpan.textContent = `${arithmeticNum1} X 
        ${arithmeticNum2} = ?`;
    } 
	//חישוב התוצאה עבור חיבור
    else {
        arithmeticExpectedAnswer = Number(arithmeticNum1 / arithmeticNum2);
		//הצגת חישוב אריתמטי עם חיסור
        arithmeticChallengeSpan.textContent = `${arithmeticNum1} / ${arithmeticNum2} = ?`;
     }
	//ניקוי שדה התשובה והסתרת הודעת השגיאה
     arithmeticAnswerInput.value = '';
     arithmeticError.classList.add('hidden');
    }

    function refreshCaptcha() {
        generateArithmeticCaptcha();
    }
    generateArithmeticCaptcha();
    refreshArithmeticCaptchaButton.addEventListener('click', refreshCaptcha);
    registerForm.addEventListener('submit', async(event)=> {
	    event.preventDefault();
        if (incorrectAttempts >= maxIncorrectAttempts) {
            captchaAttemptsError.classList.remove('hidden');
            return;
        }
        const username = document.getElementById('userInput').value;
        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passInput').value;
        const confirmPassword = document.getElementById('confirmInput').value;
        const dob = document.getElementById('dateInput').value;
        registerMessage.textContent = "";
        if (password !== confirmPassword) {
            registerMessage.textContent = "Passwords do not match.";
            registerMessage.classList.remove("text-green-500");
            registerMessage.classList.add("text-red-500");
            return;
        }
        let captchaCorrect = false;
        const userAnswer = Number(arithmeticAnswerInput.value);
        if (!isNaN(userAnswer) && userAnswer === arithmeticExpectedAnswer) {
            try {
                if(find(username)){
                    messageDiv.textContent = "Username or email already exists.";
                    messageDiv.classList.remove("text-green-500");
                    messageDiv.classList.add("text-red-500");
                    return;
                }
                if (users.length < 1 || users == undefined)
                    isAdmin = true;
                else
                    isAdmin = false;
                add(username, email, password, dob, isAdmin);
                registerMessage.textContent = "Registration successful!";
                registerMessage.classList.remove("text-red-500");
                registerMessage.classList.add("text-green-500");
                document.getElementById('userInput').value="";
                document.getElementById('emailInput').value="";
                document.getElementById('passInput').value="";
                document.getElementById('confirmInput').value="";
                document.getElementById('dateInput').value="";        
            }catch(error){
                console.error(error);
                registerMessage.textContent = "An error occurred during registration.";
                registerMessage.classList.remove("text-green-500");
                registerMessage.classList.add("text-red-500");
            }


            incorrectAttempts = 0; //איפוס כמות ניסיונות שגויים
            refreshCaptcha(); //ריענון חישוב אריתמטי
            } else {
                arithmeticError.classList.remove('hidden'); 
            }


    });

});


