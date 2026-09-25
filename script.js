const userInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passInput = document.querySelector('#password')
const confPassInput = document.querySelector('#confirmPassword');
const formInput = document.querySelector('#registrationForm')

window.addEventListener('load', function() {
    const userFormStr = localStorage.getItem('userForm') ?? 'null';
    if (userFormStr) {
        const userData = JSON.parse(userFormStr);
        userInput.value = userData.username;
    }
})

userInput.addEventListener('input', function(event) {
    validInput(userInput);
    usernameError.textContent = userInput.validationMessage;
})

emailInput.addEventListener('input', function(event) {
    validInput(emailInput);
    emailError.textContent = emailInput.validationMessage;
})

passInput.addEventListener('input', function(event) {
    validInput(passInput);
    passwordError.textContent = passInput.validationMessage;
})

confPassInput.addEventListener('input', function(event) {
    validPassword(confPassInput)
    confirmPasswordError.textContent = confPassInput.validationMessage;
})

formInput.addEventListener('submit', function(event) {
    event.preventDefault();
    validInput(userInput);
    validInput(emailInput);
    validInput(passInput)
    validPassword(confPassInput);
    
    if (!formInput.checkValidity()) {
        formInput.reportValidity();
        alert('doesnt work');
        return;
    }
    const formData = {
        username: userInput.value,
        email: emailInput.value,
        password: passInput.value,
    }
    localStorage.setItem('userForm', JSON.stringify(formData));
    alert('SUCCESS YOU SUBMITTED THE FORM')
})

function validInput(input) {
    input.setCustomValidity('');

    if (input.validity.typeMismatch) {
        input.setCustomValidity(`Please Enter Valid ${input.name}`);
    } else if (input.validity.valueMissing) {
        input.setCustomValidity(`We need a ${input.name} to continue`);
    } else if (input.validity.tooShort) {
        input.setCustomValidity(`${input.name} must be at least ${input.minLength} characters.`);
    }
}

function validPassword(input) {
    input.setCustomValidity('');
    if (input.validity.valueMissing) {
        input.setCustomValidity(`We need a ${input.type} to continue`);
    } else if (input.value != passInput.value) {
        input.setCustomValidity('Passwords do not match');
    }
}