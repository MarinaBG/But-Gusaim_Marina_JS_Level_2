class HamburgerException{
    constructor(message) {
        this.message = message;
    }
}

class Hamburger {  
    constructor(size, stuffing){
        if(!size)
            throw new HamburgerException(`Неправильно указан размер гамбургера!`);
        if(!stuffing)
            throw new HamburgerException(`Отсутствует начинка гамбургера!`);
        this.setSize(size);
        this.setStuffing(stuffing);
        this.topping = [];
   }

    setSize(size){
        this.size = size.name;
        this.price = size.price;
        this.calorificValue = size.calorificValue;
    }

    setStuffing(stuffing){  
        this.stuffing = stuffing.name;
        this.price += stuffing.price;
        this.calorificValue += stuffing.calorificValue;
    }

    addTopping(topping){
        if (this.topping.indexOf(topping) != -1) {
            throw new HamburgerException(`Такая добавка уже добавлена в гамбургер!`);
        }
        
        this.topping.push(topping);
        this.price += topping.price;
        this.calorificValue += topping.calorificValue; 
    }

    removeTopping(topping){
        let checkToppingAdd = this.topping.indexOf(topping);

        if (checkToppingAdd == -1) {
            throw new HamburgerException(`Такая добавка еще не добавлена в гамбургер!`);
        }
        
        this.topping.splice(checkToppingAdd, 1);
        this.price -= topping.price;
        this.calorificValue -= topping.calorificValue; 
    }

    getToppings(){
        return this.topping;
    }

    getSize(){
        return this.size;
    }

    getStuffing(){
        return this.stuffing;
    }

    calculatePrice(){
        return this.price;
    }

    calculateCalories(){
        return this.calorificValue;
    }
}

Hamburger.SIZE_SMALL = {
    name: 'маленький',
    price: 50,
    calorificValue: 20
};
Hamburger.SIZE_LARGE = {
    name: 'большой',
    price: 100,
    calorificValue: 40
};
Hamburger.STUFFING_CHEESE = {
    name: 'сыр',
    price: 10,
    calorificValue: 20
};
Hamburger.STUFFING_SALAD = {
    name: 'салат',
    price: 20,
    calorificValue: 5
};
Hamburger.STUFFING_POTATO = {
    name: 'картофель',
    price: 15,
    calorificValue: 10
};
Hamburger.TOPPING_MAYO = {
    name: 'майонез',
    price: 20,
    calorificValue: 5
};
Hamburger.TOPPING_SPICE = {
    name: 'специи',
    price: 15,
    calorificValue: 0
};

try {
    let hamburger = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_POTATO);
    console.log(hamburger);
    hamburger.addTopping(Hamburger.TOPPING_MAYO);
    console.log(hamburger);
    hamburger.addTopping(Hamburger.TOPPING_SPICE);
    console.log(hamburger);
    hamburger.removeTopping(Hamburger.TOPPING_MAYO);
    console.log(hamburger);
    console.log(hamburger.getToppings());
    console.log(`Размер гамбургера: ${hamburger.getSize()}`);
    console.log(`Начинка у гамбургера: ${hamburger.getStuffing()}`);
    console.log(`Стоимость гамбургера составляет ${hamburger.calculatePrice()} тугриков`);
    console.log(`Калорийность гамбургера составляет ${hamburger.calculateCalories()} Ккал`);
} catch (e) {
    console.log(`Ошибка: ${e.message}`);
}
