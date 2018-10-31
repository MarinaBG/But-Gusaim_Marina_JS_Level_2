let Api = {
    add: 'review.add.json',
    show: 'review.list.json',
    delete: 'review.delete.json',
    submit: 'review.submit.json'
};
class Review {
	constructor() {
        this.reviews = [];
        this.submit = [];
        this.setEventsAdd();
        this.request(Api.show)
    }
    request(url, data) {
        $.post({
            url: url,
            data: data,
            dataType: 'json',
            context: this,
            success: function(response) {
                if (response.result == 0) {
                    console.error(response);
                    alert(`Ошибка: ${response.userMessage}`);
                } else {
                    if (url == Api.add) {
                        console.log(response);
                        alert(response.userMessage);
                    } else if (url == Api.show) {
                        this.onShow(response);
                    } else if (url == Api.delete) {
                        console.log(`Отзыв успешно удален: ${response.result}`);
                    } else if (url == Api.submit) {
                        console.log(`Отзыв одобрен: ${response.result}`);
                        alert('Отзыв одобрен');
                    }
                }
            },
            error: function(error){
                console.log(error);
            }
        });
    }
    setEventsAdd() {
        let self = this;
        document.querySelector('#btn_submit').addEventListener('click', function() {
            self.onAdd(event);
        });
    }
    onAdd(event){
        let item = {};
        item.id_comment = document.querySelector("#name").value;
        item.text = document.querySelector("#textReview").value;

        document.querySelector("#name").value = '';
        document.querySelector("#textReview").value = '';
        
        this.reviews.push(item);
        console.log(this.reviews);

        this.request(Api.add, item);
        this.showReviews();
    }
    setEventRemove(btnRemove) {
        let self = this;
        
        btnRemove.addEventListener('click', function() {
            self.onRemove(event);
        });
    } 
    onRemove(event){
        let id = parseInt($(event.currentTarget).attr('data-id'));

		if (id >= 0) {
            this.request(Api.delete, this.reviews[id].id_comment);
            this.reviews.splice(id, 1);
            this.showReviews();
        }
        event.preventDefault();
    }
   setEventApprove(btnApprove) {
        let self = this;
        
        btnApprove.addEventListener('click', function() {
            self.onApprove(event);
        });        
    } 
    onApprove(event){
        let id = parseInt($(event.currentTarget).attr('data-id'));
       
        if (id >= 0) {
            this.request(Api.submit, this.reviews[id].id_comment);
        }
        event.preventDefault();
    }
    onShow(arr){
        for (let i = 0; i < arr.length; i++) {
            this.reviews.push(arr[i]);
        }
        this.showReviews();
    }
    showReviews(){       
        let self = this;
        let reviewsFields = document.querySelector('.reviewsFields');
        reviewsFields.innerHTML = '';

        for (let i = 0; i < this.reviews.length; i++) {
            self.renderReview(i, this.reviews[i], reviewsFields);
        }
    }
    renderReview(i, item, div) {
        let reviewField = document.createElement('div')
        reviewField.className = 'reviewField';
        div.appendChild(reviewField);

        let reviewItemName = document.createElement('b');
        reviewItemName.innerHTML = item.id_comment;
        reviewField.appendChild(reviewItemName);

        let reviewItemReview = document.createElement('p');
        reviewItemReview.innerHTML = item.text;
        reviewField.appendChild(reviewItemReview);

        let btnRemove = document.createElement('button');
        btnRemove.className = 'btn btn-primary btn_remove';
        btnRemove.setAttribute('data-id', i);
        btnRemove.innerHTML = 'Удалить отзыв';
        reviewField.appendChild(btnRemove);

        this.setEventRemove(btnRemove);

        let btnApprove = document.createElement('button');
        btnApprove.className = 'btn btn-primary btn_approve';
        btnApprove.setAttribute('data-id', i);
        btnApprove.innerHTML = 'Одобрить отзыв';
        reviewField.appendChild(btnApprove);

        this.setEventApprove(btnApprove);
    }    
};

$( window ).on( "load", function(){
	window.cart = new Review();
});
