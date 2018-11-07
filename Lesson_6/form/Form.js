class FormValidation {
    constructor(){
        this.submit =  document.querySelector('#submit');
        this.setEventListener();
        this.getCities();
        this.chooseDateOfBirth();
    }
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
    ////Добавлено в ДЗ 6
    chooseDateOfBirth(){
        $('#data').datepicker({
            monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
            dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            dateFormat: "dd.mm.yy"
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

            ////Изменено в ДЗ 6
            if (!self.updateElementValidation(inputText, inputText.value.length)) {
                $('#dialog').html("Неодходимо корректно заполнить обязательное поле 'Текст сообщения'!");
            } 
            if (!self.updateElementValidation(inputEmail, /^[a-z]+[.|\-|a-z]{1}[a-z]{0,}[@]{1}[[a-z|\d]+[.]{1}[a-z]{2,3}$/.test(inputEmail.value))){
                $('#dialog').html("Неодходимо корректно заполнить обязательное поле 'E-mail'!");
            }
            if (!self.updateElementValidation(inputPhone, /^[+]{1}[7]{1}[(]{1}[\d]{3}[)]{1}[\d]{3}[-]{1}[\d]{4}$/.test(inputPhone.value))) {
                $('#dialog').html("Неодходимо корректно заполнить обязательное поле 'Телефон'!");
            }
            if (!self.updateElementValidation(inputName, /^[a-zа-яё]+$/i.test(inputName.value))) {
                $('#dialog').html("Неодходимо корректно заполнить обязательное поле 'Имя'!");
            }
            
            self.checkSendMessage();
        });
    }
    updateElementValidation(input, validationResult) {
        if (validationResult) {
            input.removeAttribute('class');
            input.setAttribute('class', 'form-control');
            ////Добавлено в ДЗ 6
            return true;
        } else {
            input.setAttribute('class', input.className + ' error');
            ////Добавлено в ДЗ 6
            $(input).effect('shake');
            return false;
        };       
    }
    checkSendMessage(){
        if (document.querySelector('.error')) {
            event.preventDefault();
            ////Добавлено в ДЗ 6
            this.displayMessage();
        }
    }
    displayMessage(){
        $('#dialog').dialog({
            width: 400,
            height: 220,
            modal: true,
            autoOpen: false,
            buttons: {
                OK: function(){
                    $(this).dialog('close');
                }
            }
        });
        $('#dialog').dialog('open');
    }
}

let formValidation = new FormValidation();



