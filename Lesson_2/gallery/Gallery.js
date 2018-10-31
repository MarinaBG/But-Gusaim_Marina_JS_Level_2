class Gallery {
	constructor() {
		this.fetchGallery(); 
	} 
	fetchGallery(){
		let url = "http://localhost/gallery/Gallery.json";
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.send();
		let self = this;

		xhr.onreadystatechange = function(){
			if (xhr.readyState != 4) 
				return;
			
			if (xhr.status == 200) 
				self.renderGallery(JSON.parse(xhr.responseText));
		};
	}     		
	renderGallery(config) {
		let self = this;
		for (let i = 0; i < config.length; i++) {
			let imgSmall = document.createElement('img');
			imgSmall.src = config[i].preview;
			imgSmall.className = 'small';
			imgSmall.id = i;
			imgSmall.addEventListener('click', function (){
				let removeImg = document.getElementsByClassName('big')[0];
				if (imgSmall.id != removeImg.id) {
					removeImg.src = config[i].big;
					removeImg.id = i;
				}				
			});
			let div = document.getElementsByClassName('preview')[0];
			div.appendChild(imgSmall);
		}
		let imgBig = this.createImgBig(0, config);
		let div = document.getElementsByClassName('bigImg')[0];
		div.appendChild(imgBig);
	}
	createImgBig(index, config) {
		let imgBig = document.createElement('img');
		imgBig.src = config[index].big;
		imgBig.className = 'big';
		imgBig.id = index;
		return imgBig;
	}
}

let gallery = new Gallery();
