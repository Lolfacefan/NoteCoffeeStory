let respPlace = document.querySelector('.lol');
let addButton = document.querySelector('.icon-plus-circle-fill');
let taskRespawn = document.querySelector('#taskSpace');
let tasksDoneRespawn = document.querySelector('#tasksDone');

taskRespawn.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('more')) {
        let id = event.target.attributes.task_id.value;
        document.location.href = `/task/${id}`;
    } else {
        let id = event.target.attributes.task_id.value
        document.querySelector(`div[hide_id='${id}']`).classList.toggle('description');
    }
})

tasksDoneRespawn.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('more')) {
        let id = event.target.attributes.task_id.value;
        document.location.href = `/task/${id}`;
    } else {
        let id = event.target.attributes.task_id.value
        document.querySelector(`div[hide_id='${id}']`).classList.toggle('description');
    }
})

addButton.addEventListener('click', () => {
    document.location.href = "/add/";
})
addButton.addEventListener('mouseover', () => {
    addButton.classList.toggle('shadowDel')
})
addButton.addEventListener('mouseout', () => {
    addButton.classList.toggle('shadowDel')
})


function renderFooter(linkAPI, iteem) {
    function requestTasks(f) {
        axios.get(linkAPI).then((data) => {
            if (data.data.length == 0){
                permitRender = false;
            }
            f(data.data);
        })

    }
    requestTasks((data) => {
        for (i of data) {
            renderTask(i);
        };

    });

    function renderTask(data) {
        let color = 'alert-dark',
            deadLine = data.time_finish;
        deadLine = new Date(deadLine);
        deadLine = deadLine.toLocaleString().replace(",", "").slice(0, 16);
        let newElement = document.createElement('div');
        newElement.setAttribute("task_id", `${data.pk}`);
        newElement.classList.add('alert', color);
        newElement.setAttribute("role", `alert`);
        newElement.innerHTML = `
        <span class="icon-read_more_FILL0_wght400_GRAD0_opsz48 more" task_id="${data.pk}"></span>
        <h3 task_id="${data.pk}">${data.name}</h3>
        <h4 task_id="${data.pk}">Ответственный: ${data.user_id}</h4>
        <h5 task_id="${data.pk}">Дедлайн: ${deadLine}</h5>
        <div class="description" task_id="${data.pk}" hide_id="${data.pk}"><div class="card card-body" task_id="${data.pk}">${data.description}</div></div>`;
        iteem.append(newElement);
    }
};


function render(linkAPI, iteem) {
    function requestTasks(f) {
        axios.get(linkAPI).then((data) => {
            f(data.data);
        })

    }
    requestTasks((data) => {
        for (i of data) {
            renderTask(i);
        };

    });

    function renderTask(data) {
        let color = 'alert-success',
            deadLine = data.time_finish;
        if (data.done == true) {
            color = 'alert-dark'
        } else if (new Date(deadLine) < new Date()) {
            color = 'alert-danger'
        } else if (data.status == "waiting") {
            color = 'alert-warning'
        }
        deadLine = new Date(deadLine);
        deadLine = deadLine.toLocaleString().replace(",", "").slice(0, 16);
        let newElement = document.createElement('div');
        newElement.setAttribute("task_id", `${data.pk}`);
        newElement.classList.add('alert', color);
        newElement.setAttribute("role", `alert`);
        newElement.innerHTML = `
        <span class="icon-read_more_FILL0_wght400_GRAD0_opsz48 more" task_id="${data.pk}"></span>
        <h3 task_id="${data.pk}">${data.name}</h3>
        <h4 task_id="${data.pk}">Ответственный: ${data.user_id}</h4>
        <h5 task_id="${data.pk}">Дедлайн: ${deadLine}</h5>
        <div class="description" task_id="${data.pk}" hide_id="${data.pk}"><div class="card card-body" task_id="${data.pk}">${data.description}</div></div>`;
        iteem.append(newElement);
    }
};

render('http://127.0.0.1:8000/api/tasks/', taskRespawn);
render('http://127.0.0.1:8000/api/tasks/done/0/10', tasksDoneRespawn);


// выводим задачи на экран
let numerIteration = 1,
    permitRender = true;
window.onscroll = function (ev) {
    if ((window.innerHeight + window.pageYOffset + 1) >= document.body.offsetHeight) {
        const req = new Promise((event) => {
            if (permitRender){
                renderFooter(`http://127.0.0.1:8000/api/tasks/done/${numerIteration*10}/${numerIteration*10+10}`, tasksDoneRespawn);
            
            }
            
            event();
        })
        req.then(() => {
            numerIteration += 1;
        })
    }
};



// render('http://127.0.0.1:8000/api/tasks/', taskRespawn)
// render('http://127.0.0.1:8000/api/tasks/done/0/10', tasksDoneRespawn)
// window.onscroll = function (ev) {
//     if ((window.innerHeight + window.pageYOffset + 1) >= document.body.offsetHeight) {
//         console.log('На дне');
//         const req = new Promise((event) => {
//             render(`http://127.0.0.1:8000/api/tasks/done/${numerIteration*10}/${numerIteration*10+10}`, tasksDoneRespawn);
//             event();
//         })
//         req.then(() => {
//             numerIteration += 1;
//         })
//     }
// };




// function getCookie(name) {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         const cookies = document.cookie.split(';');
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             // Does this cookie string begin with the name we want?
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }







// fetch(`http://127.0.0.1:8000/tasks/`)
// .then(response => response.json())
// .then(json => {data = json.price; console.log(data);})