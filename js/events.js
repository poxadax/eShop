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
        'http://localhost:3000/users',
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
    const myRequest = new Request(
        'http://localhost:3000/products',
        {
            method: 'GET'
        }
    );

    let response = await fetch(myRequest)
    .then((response) => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('Something went wrong on api server!');
        }
    })
    .then((response) => {
        return response;
    }).catch(error => {
        console.error(error);
    });

    return response;
}

async function renderProducts(){
    let products = await getPopularProducts();
    console.log(products);

    products.forEach((product) => {
        console.log(product);
        let popularProductsNode = document.getElementById('popular-products');
        let articleNode = document.createElement('article');
        let contentNode = document.createElement('div');

        // Foto
        let imageNode = document.createElement('img');
        imageNode.src = 'img/' + product.photo;
        imageNode.alt = product.name;

        // Nombre
        let titleNode = document.createElement('h2');
        let textNode = document.createTextNode(product.name);
        titleNode.appendChild(textNode);

        // Marca
        let brandNode = document.createElement('p');
        let brandTextNode = document.createTextNode(product.brand);
        brandNode.appendChild(brandTextNode);

        contentNode.appendChild(titleNode);
        articleNode.appendChild(imageNode);
        articleNode.appendChild(contentNode);

        popularProductsNode.appendChild(articleNode);
    });
}

renderProducts();
