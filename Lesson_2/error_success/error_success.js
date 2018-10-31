function fetchResult(kind){
    let url = `http://localhost/error_success/${kind}.json`;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                let result = JSON.parse(xhr.responseText);
                if (result.result == 'error') {
                    console.log(`Сервер вернул ошибку: ${result.result}`);
                }
                if (result.result == 'success') {
                    console.log(`Сервер вернул: ${result.result}`);
                }
                
            }
        }
    };
}

fetchResult('error');
fetchResult('success');