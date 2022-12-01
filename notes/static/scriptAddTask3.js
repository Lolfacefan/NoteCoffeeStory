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
// console.log(getCookie('csrftoken'));


let addForm = document.querySelector('form'),
    name1 = document.querySelector('[name="name"]'),
    description = document.querySelector('[name="description"]'),
    status1 = document.querySelector('[name="status"]'),
    user_id = document.querySelector('[name="user_id"]'),
    time_finish = document.querySelector('[name="time_finish"]');

addForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let valid = true,
        check = time_finish.value;
    if (name1.value == '') {
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
        let req = new Promise((event)=>{
            time_finish = time_finish.value.replace("T", "-")
            time_finish = `${time_finish}:00`.split('-');
            time_finish = `${time_finish[2]}.${time_finish[1]}.${time_finish[0]} ${time_finish[3]}`

            const form_data = new FormData();
            form_data.append('csrfmiddlewaretoken', token);
            form_data.append('name', name1.value);
            form_data.append('description', description.value);
            form_data.append('status', status1.value);
            form_data.append('user_id', user_id.value);
            form_data.append('time_finish', time_finish);
            event(form_data);
        })

        req.then((data)=>{
            let config = {
                'headers': {
                    'X-CSRFToken': token,
                }
            }
            axios.post(`/add/`, data, config).then((data) => {
                if (data.status == 200){
                    document.location.href = "/";
                }
            });
        })

        

    }

})


let ttyy = {
    'csrfmiddlewaretoken': ['ajurc6hi0uawBUxgkTAQNEPx3ozb3u81sNYWw45CXqunFnrYJ1umtFtBROhIHK9U'],
    'name': ['srgsrh'],
    'description': ['srrsg'],
    'status': ['srhgs'],
    'user_id': ['2'],
    'time_finish': ['05.11.2022 09:12:19']
}