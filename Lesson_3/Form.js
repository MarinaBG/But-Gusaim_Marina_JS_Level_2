class FormValidation {
    constructor(){
        this.submit =  document.querySelector('#submit');
        this.setEventListener();
    }
    setEventListener(){
        let self = this;

        self.submit.addEventListener("click", function(event) {
            
            let inputName = document.getElementById('name');
            let inputPhone = document.getElementById('phone');
            let inputEmail = document.getElementById('email');
            let inputText = document.getElementById('text');  

            self.updateElementValidation(inputName, /^[a-zа-яё]+$/i.test(inputName.value));
            self.updateElementValidation(inputPhone, /^[+]{1}[7]{1}[(]{1}[0-9]{3}[)]{1}[0-9]{3}[-]{1}[0-9]{4}$/.test(inputPhone.value));
            self.updateElementValidation(inputEmail, /^[a-z]+[.|\-|a-z]{1}[a-z]{0,}[@]{1}[[a-z|\d]+[.]{1}[a-z]{2,3}$/.test(inputEmail.value));
            self.updateElementValidation(inputText, inputText.value.length);

            self.checkSendMessage();
        });
    }
    updateElementValidation(input, validationResult) {
        if (validationResult) {
            input.removeAttribute('class');
            input.setAttribute('class', 'form-control');
        } else {
            input.setAttribute('class', input.className + ' error');
        };       
    }
    checkSendMessage(){
        if (document.querySelector('.error')) {
            event.preventDefault();
            alert('Неодходимо корректно заполнить все обязательные поля!');
        }
    }
}

let formValidation = new FormValidation();

