class FormValidation {
    constructor(cb){
        this.citiesArr = [];
        this.submit =  document.querySelector('#submit');
        this.setEventListener();
        this.getCities(cb);
        this.chooseDateOfBirth();
        
    }
    getCities(cb) {    
        let self = this;
        $.ajax({
            url: 'project/json/cities.json', 
            // url: 'json/cities.json',             
            type : 'GET',
            dataType : 'json', 
            async: true,                    
            success: function (data) {                      
                $.each(data, function(key, data) {
                    self.citiesArr.push(data.city);
                });
                
                self.citiesArr.sort();
                
                self.getCitiesForSelect(self.citiesArr);
                self.getCitiesForAutocomplit(self.citiesArrr); 
                
                if (cb) {
                    cb();
                }
            },
            error: function(e){
                console.log(e);
            } 
        });
    }
    getCitiesForSelect(arr){
        $.each(arr, function(key, arr) {
            $('#selectCity').append($('<option />').attr('class', 'selectCityItem').html(arr));
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
    chooseDateOfBirth(){
        $('#data').datepicker({
            monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
            dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            dateFormat: "dd.mm.yy"
        });
    }
    setEventListener(){
        let self = this;

        self.submit.addEventListener("click", function(event) {
            
            let inputName = document.getElementById('name');
            let inputPhone = document.getElementById('phone');
            let inputEmail = document.getElementById('email');
            let inputText = document.getElementById('text');  

            if (!self.updateElementValidation(inputText, self.validateText(inputText.value))) {
                $('#dialog').html("Неодходимо корректно заполнить обязательное поле 'Текст сообщения'!");
            } 
            if (!self.updateElementValidation(inputEmail, self.validateEmail(inputEmail.value))){
                $('#dialog').html("Неодходимо корректно заполнить обязательное поле 'E-mail'!");
            }
            if (!self.updateElementValidation(inputPhone, self.validatePhone(inputPhone.value))) {
                $('#dialog').html("Неодходимо корректно заполнить обязательное поле 'Телефон'!");
            }
            if (!self.updateElementValidation(inputName, self.validateName(inputName.value))) {
                $('#dialog').html("Неодходимо корректно заполнить обязательное поле 'Имя'!");
            }
            
            self.checkSendMessage();
        });
    }
    validateName(name){
        return /^[a-zа-яё]+$/i.test(name);
    }
    validatePhone(phone){
        return /^[+]{1}[7]{1}[(]{1}[\d]{3}[)]{1}[\d]{3}[-]{1}[\d]{4}$/.test(phone);
    }
    validateEmail(email){
        return /^[a-z]+[.|\-|a-z]{1}[a-z]{0,}[@]{1}[[a-z|\d]+[.]{1}[a-z]{2,3}$/.test(email);
    }
    validateText(text){
        return text.length;
    }
    updateElementValidation(input, validationResult) {
        if (validationResult) {
            $(input).attr('class', 'form-control');
            return true;
        } else {
            $(input).attr('class', input.className + ' error');
            $(input).effect('shake');
            return false;
        };       
    }
    checkSendMessage(){
        if (document.querySelector('.error')) {
            event.preventDefault();
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

/* let formValidation = new FormValidation(); */



