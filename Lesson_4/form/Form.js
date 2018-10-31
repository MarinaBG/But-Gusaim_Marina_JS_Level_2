class FormValidation {
    constructor(){
        this.submit =  document.querySelector('#submit');
        this.setEventListener();
        this.getCities();
    }
    ///Добавлено ДЗ 4
    getCities() {    
        let self = this;
        $.ajax({
            url: 'cities.json',             
            type : 'GET',
            dataType : 'json', 
            async: true,                    
            success: function (data) {                      
                let citiesArr = [];
                $.each(data, function(key, data) {
                    citiesArr.push(data.city);
                });
                citiesArr.sort();
                
                self.getCitiesForSelect(citiesArr);
                self.getCitiesForAutocomplit(citiesArr);
            },
            error: function(e){
                console.log(e);
            } 
        });
    }
    getCitiesForSelect(arr){
        $.each(arr, function(key, arr) {
            let cityOption = document.createElement('option');
            cityOption.innerHTML = arr;
            let cityDiv = document.querySelector('#selectCity');
            cityDiv.appendChild(cityOption);
        });
    }
    getCitiesForAutocomplit(arr){
        $('#autocomplitCity').autocomplete({
            minLength: 3,
            source: function(req, add) {
                var matcher = new RegExp(`^${$.ui.autocomplete.escapeRegex(req.term)}`, "i");
                add( $.grep(arr, function(item){
                    return matcher.test(item);
                }));
            }
        });
    }
    ////
    setEventListener(){
        let self = this;

        self.submit.addEventListener("click", function(event) {
            
            let inputName = document.getElementById('name');
            let inputPhone = document.getElementById('phone');
            let inputEmail = document.getElementById('email');
            let inputText = document.getElementById('text');  

            self.updateElementValidation(inputName, /^[a-zа-яё]+$/i.test(inputName.value));
            self.updateElementValidation(inputPhone, /^[+]{1}[7]{1}[(]{1}[\d]{3}[)]{1}[\d]{3}[-]{1}[\d]{4}$/.test(inputPhone.value));
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



