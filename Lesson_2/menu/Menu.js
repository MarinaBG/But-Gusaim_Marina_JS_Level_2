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
        if (!config) {
			this.fetchMenu();
		} else {
			this.createItems(config, id);
		}        
    }
    fetchMenu(){
		let url = "http://localhost/menu/menu.json";
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.send();
		let self = this;

		xhr.onreadystatechange = function(){
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					let config = JSON.parse(xhr.responseText);
					self.createItems(config, this.id);
					self.create();
				}
			}
		};
	}
    createItems(config, id){
        for (let i = 0; i < config.length; i++) {
            this.items.push(new MenuItem(config[i].href, config[i].name,`item_${id}_${i}`));   
        }
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
    createItems(config, id){      
        for (let i = 0; i < config.length; i++) {
            this.items.push(new MenuItem(config[i].href, config[i].name, `item_${id}_${i}`));  

            if (config[i].submenuItems) {
                this.items.push(new MenuWithSubmenu('main-menu2', config[i].submenuItems)); 
            }      
        }
    } 
};

class MenuItem extends Container {
    constructor(href, name, id){
        super();
        this.href = href;
        this.name = name;
        this.id = id;
    }
    render(){
        let resultSubmenu = `<li id=${this.id}><a href=''${this.href}>${this.name}</a>`;
        return resultSubmenu;
    }
};


let menu = new Menu('main-menu1');
menu.create();
let menuWithSubmenu = new MenuWithSubmenu('main-menu2');
menuWithSubmenu.create();

// let removeElement = new Container();
// removeElement.remove('item_main-menu1_1');


