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
