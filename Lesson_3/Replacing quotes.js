class QuotesInText {
    constructor(text){
        this.text = text;
        this.renderText();
        this.renderReplaceText();
    }
    renderText(){
        let sourceText = document.querySelector('.sourceText');
        sourceText.innerHTML = this.text;
    }
    replaceText(){
        //если расширить варинты текста, когда знаки препинания есть после кавычек('Isn't this game really cool', - he asked.), то можно усложнить шаблон
        // this.text = this.text.replace(/('(?=\W))|(\s')|(^'|'$)/g, '"');
        this.text = this.text.replace(/(\s'|'\s)|(^'|'$)/g, '"');
    }
    renderReplaceText(){
        this.replaceText();
        this.replace = document.querySelector('#replace');
        let self = this;
        
        replace.addEventListener("click", function(event) {
            let modifiedText = document.querySelector('.modifiedText');
            modifiedText.innerHTML = self.text;
        });

    }
}

let quotesInText = new QuotesInText("'Isn't this game really cool' - he asked.\nShe said: 'Well, it's so hard and I can't pass the first level!'");