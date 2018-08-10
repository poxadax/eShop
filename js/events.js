function domSlider(idSlider) {
    const slider = new Slider(0, document.querySelectorAll(`#${idSlider} li`));
    const nextNode = document.querySelector(`#${idSlider} .next`);
    const prevNode = document.querySelector(`#${idSlider} .prev`);
    nextNode.onclick = function () {
        slider.next();
    };
    prevNode.onclick = function () {
        slider.prev();
    };

    let intervalId = setInterval(() => {
        nextNode.click();
    }, 5000);
}

domSlider('Slider');



const formNode = document.getElementById('register-form')

formNode.addEventListener('submit', function(e){
    e.preventDefault();

    const nameNode = document.getElementById('name');
    const mailNode = document.getElementById('mail');
    const passwordNode = document.getElementById('password');
    let data = {
        name: nameNode.value,
        mail: mailNode.value,
        password: passwordNode.value,
    };
    

    const myRequest = new Request(
        'https://my-json-server.typicode.com/poxadax/eshop/users',
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type' : 'application/json'
            }
        }
    );

    fetch(myRequest)
    .then((response) => {
        if (response.status === 201) {
            return response.json();
        } else {
            throw new Error('Something went wrong on api server!');
        }
    })
    .then((response) => {
        console.log(response);
    }).catch(error => {
        console.error(error);
    })
});

async function getPopularProducts(){
    // Enviar la informacion al API
    const reqProducts = new Request(
        'https://my-json-server.typicode.com/poxadax/eshop/products', // Cambiar por tu propia API
        {
            method: 'GET'
        }
    );

    let response = await fetch(reqProducts)
    .then((response) => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('Something went wrong on api server!');
        }
    })
    .then((response) => {
        return response;
    }).catch((error) => {
        console.error(error);
    });

    return response;
}

async function renderProducts() {
    let products = await getPopularProducts();

    let popularProductsNode = document.getElementById('popular');
    let articleNode = document.querySelector('#popular article');
    articleNode.remove();

    products.forEach((product) => {
        let newArticle = articleNode.cloneNode(true);
        newArticle.children[0].src = 'img/' + product.photo;
        newArticle.children[1].innerText = product.name;
        newArticle.children[2].innerText = product.brand;
        newArticle.children[3].innerText = product.reviews;
        newArticle.children[4].innerText = product.price;
        /*-
        newArticle.children[1].children[0].innerText = product.name;
        newArticle.children[1].children[1].innerText = product.brand;
        newArticle.children[1].children[2].innerText = product.reviews;
        newArticle.children[1].children[4].innerText = product.price;
-*/
        popularProductsNode.appendChild(newArticle);
    });
}



renderProducts();