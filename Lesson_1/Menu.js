let config = [ {
    href: '/',
    name: 'Главная'
}, {
    href: '/catalog',
    name: 'Каталог'
},
{
    href: '/gallery',
    name: 'Галерея',
    submenuItems: [
        {
            href: '/1',
            name: 'Photo_1'
        }, {
            href: '/2',
            name: 'Photo_2'
        }, {
            href: '/3',
            name: 'Photo_3'
        }]
}];

class Container {
    remove(id) {
        var element = document.querySelector(`#${id}`);
        element.remove();
    }
};

class Menu extends Container {
    constructor(id, config){
        super();
        this.id = id;
        this.items = [];
        this.createItems(config, id);
    }
    createItems(config, id){
        for (let i = 0; i < config.length; i++) {
            this.items.push(new MenuItem(config[i].href, config[i].name, config[i].submenuItems, `item_${id}_${i}`));        }
    }
    create() {
        document.write(this.render());
    }
    render() {
        let result = `<ul id="${this.id}">`;

        for (let i = 0; i < this.items.length; i++) {
            result += this.items[i].render();
        };

        result += '</ul>';
        return result;
    }
};

class MenuWithSubmenu extends Menu {
    constructor(id, config){
        super(id, config);
    }    
    render(){
        let result = `<ul id="${this.id}">`;

        for (let i = 0; i < this.items.length; i++) {
            result += this.items[i].render();

            if (this.items[i].submenuItems) {
                
                let submenu = new MenuWithSubmenu('submenu', this.items[i].submenuItems);
                let resultSubmenu = `<ul id="submenu">`;
        
                for (let j = 0; j < submenu.items.length; j++) {
                    resultSubmenu += submenu.items[j].render();
                }
                resultSubmenu += '</ul>'; 
                result += resultSubmenu;
            }
        };

        result += '</li></ul>';
        return result;
    }
};

class MenuItem extends Container {
    constructor(href, name, submenuItems, id){
        super();
        this.href = href;
        this.name = name;
        this.submenuItems = submenuItems;
        this.id = id;
    }
    render(){
        let resultSubmenu = `<li id=${this.id}><a href=''${this.href}>${this.name}</a>`;
        return resultSubmenu;
    }
};


let menu = new Menu('main-menu1', config);
menu.create();
let menuWithSubmenu = new MenuWithSubmenu('main-menu2', config);
menuWithSubmenu.create();

let removeElement = new Container();
removeElement.remove('item_main-menu1_1');


