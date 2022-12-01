function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
token = getCookie('csrftoken');
console.log(token);



let addForm = document.querySelector('#task'),
    // task_id = document.querySelector('.description').attributes.id.value,
    name1 = document.querySelector('[name="name"]'),
    description = document.querySelector('[name="description"]'),
    status1 = document.querySelector('[name="status"]'),
    user_id = document.querySelector('[name="user_id"]'),
    time_finish = document.querySelector('[name="time_finish"]'),
    sendMessage = document.querySelector('#sendMessage'),
    textComment = document.querySelector('[name="textComment"]');
comments = document.querySelector('#comments'),

    let = renderComments = () => {
        axios.get(`/api/comments/${task_id}/`).then((respose) => {
            // очищаем сначала поле комментов, и заново отрисовываем
            comments.innerHTML = "";
            respose.data.forEach(element => {
                let time_create = element.time_create;
                time_create = new Date(time_create);
                time_create = time_create.toLocaleString().replace(",", "").slice(0, 16);
                let newElement = document.createElement('div');
                newElement.classList.add('alert', "alert-primary");
                newElement.setAttribute("role", `alert`);
                newElement.setAttribute("comment_id", `${element.pk}`);
                let button_delete = '';
                if (element.author.pk == authUser) {
                    button_delete = `<span class="icon-delete_FILL0_wght400_GRAD0_opsz48 delete" comment_id="${element.pk}" title="удалить"></span>`

                }
                newElement.innerHTML = `
            ${button_delete}
            <h3>${element.author.first_name}</h3>
            <div class="card card-body">${element.text}</div>
            <h5>${time_create}</h5>`;
                comments.append(newElement);
            })
        });
    }

renderComments();

// загрузка данных в форму
axios.get(`/api/task/${task_id}/`).then((respose) => {
    respose.data.users.forEach(element => {
        let newElement = document.createElement('option');
        newElement.setAttribute("value", `${element.pk}`);
        newElement.innerText = `${element.first_name}`;
        user_id.append(newElement)
    });
    name1.value = respose.data.name;
    description.value = respose.data.description;
    status1.value = respose.data.status;
    user_id.value = respose.data.user_id;
    time_finish.value = respose.data.time_finish.slice(0, 16);

});

// Удание своего коммента
comments.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('delete')) {
        event.target.disabled = true
        event.target.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`
        let id = event.target.attributes.comment_id.value;
        axios.get(`/api/commentdelete/${id}/`).then((data) => {
            if (data.status == 200) {
                document.querySelector(`[comment_id="${id}"]`).remove();
            };
        });
        // document.location.href = `/task/${id}`;
    }
})

console.log(addForm)
// Отправка на сервер измененной задачи
addForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let valid = true;
    if (name1.value.trim() == '') {
        valid = false;
        name1.classList.add('is-invalid');
    }
    if (description.value == '') {
        valid = false;
        description.classList.add('is-invalid');
    }
    if (status1.value == 'Выбери статус задачи') {
        valid = false;
        status1.classList.add('is-invalid');
    }
    if (user_id.value == 'Выбери исполнителя') {
        valid = false;
        user_id.classList.add('is-invalid');
    }
    if (time_finish.value == '') {
        valid = false;
        time_finish.classList.add('is-invalid');
    }

    if (valid) {
        let button = event.target.querySelector('button')
        button.disabled = true
        button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Загрузка...`
        let req = new Promise((event) => {
            time = `${time_finish.value}:00Z`
            const data = {
                "csrfmiddlewaretoken": token,
                "name": name1.value,
                "description": description.value,
                "status": status1.value,
                "user_id": user_id.value,
                "time_finish": time
            }

            event(data);
        })

        req.then((data) => {
            let config = {
                'headers': {
                    'X-CSRFToken': token,
                }
            }
            axios.post(`/api/task/${task_id}/`, data, config).then((data) => {
                if (data.status == 200) {
                    setTimeout(()=>{
                        button.disabled = false
                        button.innerHTML = `Изменить`
                        name1.classList.remove('is-invalid');
                        description.classList.remove('is-invalid');
                        status1.classList.remove('is-invalid');
                        user_id.classList.remove('is-invalid');
                        time_finish.classList.remove('is-invalid');
                    }, 1000)
                    // document.location.href = "/";
                }
            });
        })



    }

});


// На отравку коммента на сервер и перерисовка блока комментов
sendMessage.addEventListener('click', (event) => {
    event.preventDefault();
    if (textComment.value.trim() == ''){
        textComment.classList.add('is-invalid');
    } else{
        event.target.disabled = true
        event.target.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Загрузка...`
        let req = new Promise((event) => {
            const data = {
                "csrfmiddlewaretoken": token,
                "text": textComment.value,
            }

            event(data);
        })

        req.then((data) => {
            let config = {
                'headers': {
                    'X-CSRFToken': token,
                }
            }
            console.log('Отправляю')
            axios.post(`/api/comments/${task_id}/`, data, config).then((data) => {
                if (data.status == 200) {
                    setTimeout(()=>{
                        renderComments();
                        event.target.disabled = false;
                        event.target.innerHTML = `Отправить`;
                        textComment.value = "";
                        textComment.classList.remove('is-invalid');
                        // document.location.reload()
                        // document.location.href = "/";
                    }, 500)
                    
                }
            });
        })
    }
});