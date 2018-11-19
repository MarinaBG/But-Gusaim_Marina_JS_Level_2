describe("Проверка регулярных выражений", function() {
  let form;
    
  let inputNameValuesTrue = ['Василий', 'Анна', 'Иван'];
  let inputNameValuesFalse = ['', 'Ан7', 'Ва_силий'];
  let inputPhoneValuesTrue = ['+7(999)999-9999', '+7(678)568-9909'];
  let inputPhoneValuesFalse = ['', '+8(999)999-9999', '+7(999)99-9999', '+7(999)999-999', '+7(999)9999999', '+7(999)a999999'];
  let inputEmailValuesTrue = ['mymail@mail.ru', 'my.mail@mail.ru', 'my-mail@mail.ru'];
  let inputEmailValuesFalse = ['', 'mymailmail.ru', 'mym ail@mail.ru', 'mymail@mail', 'mymail@.ru', 'my!mail@mail.ru'];

  beforeAll(function(done) {
    loadFixtures('form.html');
    form = new FormValidation();
    done();
  });

  it('Валидация имени - true', function(){
    for (let i = 0; i < inputNameValuesTrue.length; i++) {
      expect(form.validateName(inputNameValuesTrue[i])).toBe(true);
    }    
  });
  it('Валидация имени - false', function(){
    for (let i = 0; i < inputNameValuesFalse.length; i++) {
      expect(form.validateName(inputNameValuesFalse[i])).toBe(false);
    }    
  });

  it('Валидация телефона - true', function(){
    for (let i = 0; i < inputPhoneValuesTrue.length; i++) {
      expect(form.validatePhone(inputPhoneValuesTrue[i])).toBe(true);
    }    
  });
  it('Валидация телефона - false', function(){
    for (let i = 0; i < inputPhoneValuesFalse.length; i++) {
      expect(form.validatePhone(inputPhoneValuesFalse[i])).toBe(false);
    } 
  });

  it('Валидация E-mail - true', function(){
    for (let i = 0; i < inputEmailValuesTrue.length; i++) {
      expect(form.validateEmail(inputEmailValuesTrue[i])).toBe(true);
    }    
  });
  it('Валидация E-mail - false', function(){
    for (let i = 0; i < inputEmailValuesFalse.length; i++) {
      expect(form.validateEmail(inputEmailValuesFalse[i])).toBe(false);
    } 
  });
});

describe("Проверка статуса элементов формы после валидации", function() {
  let form;
  
  beforeEach(function(done) {
    loadFixtures('form.html');
    form = new FormValidation();
    done();
  });

  it("Проверка статуса true элемента формы name", function() {
      expect(form.updateElementValidation($('#name'), true)).toBe(true);
      expect($('#name').attr('class')).toBe('form-control');
  });
  it("Проверка статуса false элемента формы name", function() {
      expect(form.updateElementValidation($('#name'), false)).toBe(false);
      expect($('#name').attr('class')).toContain('error'); 
  });

  it("Проверка статуса true элемента формы phone", function() {
      expect(form.updateElementValidation($('#phone'), true)).toBe(true);
      expect($('#phone').attr('class')).toBe('form-control');
  });
  it("Проверка статуса false элемента формы phone", function() {
      expect(form.updateElementValidation($('#phone'), false)).toBe(false);
      expect($('#phone').attr('class')).toContain('error');
  });

  it("Проверка статуса true элемента формы email", function() {
      expect(form.updateElementValidation($('#email'), true)).toBe(true);
      expect($('#email').attr('class')).toBe('form-control');
  });
  it("Проверка статуса false элемента формы email", function() {
      expect(form.updateElementValidation($('#email'), false)).toBe(false);
      expect($('#email').attr('class')).toContain('error'); 
  });

  it("Проверка статуса true элемента формы text", function() {
      expect(form.updateElementValidation($('#text'), true)).toBe(true);
      expect($('#text').attr('class')).toBe('form-control');
  });
  it("Проверка статуса false элемента формы text", function() {
      expect(form.updateElementValidation($('#text'), false)).toBe(false);
      expect($('#text').attr('class')).toContain('error');
  });  
});

describe("Выполнение Async Request", function() {
  let form;

  beforeEach(function(done) {
    loadFixtures('form.html');
    form = new FormValidation(done);
  });

  it("request выполняется, данные приходят в массив", function(done) {
    expect(form.citiesArr.length).toBe(2505);
    done();
  });
});

describe("Проверка формы select-cities", function() {
  let form;

  beforeEach(function(done) {
    loadFixtures('form.html');
    form = new FormValidation(done);
  });

  it("Все города отображаются в окне выбора", function(done) {
    expect($('.selectCityItem').length).toBe(2505);
    done();
  });
});
