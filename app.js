//* Получить пользователей (users) от сервера https://jsonplaceholder.typicode.com.
//* получив ответ от сервера, вывести имена пользователей на страницу.
//* При клике на имя пользователя, в произвольном месте должна появиться подробная информация о нем.


    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/users")


    xhr.addEventListener('load', ()=>{
        //! DATA
        const container = document.createElement('div');
        container.classList.add("container");

        const userInfoContainer = document.createElement('div')
        userInfoContainer.classList.add('user-info')

        const arrOfUsers = JSON.parse(xhr.responseText)
        console.log(arrOfUsers)

        const objOfUsers = arrOfUsers.reduce((acc,user) => {
            acc[user.id] = user;
            return acc
        },{}) //! Забыл указать {} в конце, поэтому была ошибка

        console.log(objOfUsers)


        function createListNames(obj){
            const fragment = document.createDocumentFragment()
            Object.values(obj).forEach(user => {

                for(let prop in user){
                    if(user[prop] === user.name){
                        const li = document.createElement('li');
                        li.classList.add('list-group-item');
                        li.textContent = user.name;
                        li.setAttribute("data-user-id", user.id)
                        fragment.appendChild(li)
                        li.addEventListener('click',()=>{
                            if(userInfoContainer.innerHTML === ""){
                                createNewCard(user)
                            }else{

                                userInfoContainer.innerHTML = ""
                                createNewCard(user)
                            }
                        })
                    }
                }
            })
            const list = document.createElement('ul');
            list.classList.add('list-group');
            list.appendChild(fragment);

            container.appendChild(list);
            document.body.appendChild(container)

        }
//! UI ELEMENTS
//! EVENTS

        function createFilterObj(user){
            const talbeSchema = {
                name:"name",
                email:"email",
                phone:"phone",
                username:"usern",
                website:"web",
            }
            return Object.keys(talbeSchema).reduce((acc, key) => {
                if (key in user) {
                    acc[key] = user[key]
                }
                return acc
            }, {})
        }

        function createNewCard(user){
            const card = document.createElement('div');
            const cardBody = document.createElement('div');
            const cardText = document.createElement('div');
            const cardTitle = document.createElement('h5');
            const list = document.createElement('ul');
            card.classList.add("card", "m-auto", "mt-3", "text-center");
            card.style.width = '40rem'
            card.setAttribute("data-card-id", user.id)
            cardBody.classList.add('card-body');
            cardText.classList.add('card-text')
            cardTitle.classList.add('card-title');
            list.classList.add('list-group');

            cardTitle.textContent = user.name;

            const filteredObj = createFilterObj(user)

            for (let prop in filteredObj){
                const li = document.createElement('li')
                li.classList.add('list-group-item')
                li.textContent = `${prop}: ${filteredObj[prop]}`
                list.appendChild(li);
            }
            console.log(cardTitle.textContent)
            const fragment = document.createDocumentFragment()

            cardText.appendChild(list);
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText)
            card.appendChild(cardBody)
            fragment.appendChild(card)
            userInfoContainer.appendChild(card)
            container.insertAdjacentElement('beforeend',userInfoContainer)
        }

        createListNames(objOfUsers)
        function postUser(body,cb){
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://jsonplaceholder.typicode.com/users');
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText);
                cb(response)
            })

            xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
            xhr.send(JSON.stringify(body))
        }
            const btnPost = document.querySelector('.btn-add-post');
            const form = document.forms['addUser'];
            btnPost.addEventListener('click', (e) => {
                e.preventDefault();

                const inputName = form.elements['name'].value;
                const inputEmail = form.elements['email'].value;
                const inputPhone = form.elements['phone'].value;
                const inputWebsite = form.elements['website'].value;



                if(!inputName || !inputEmail || !inputPhone || !inputWebsite){
                    alert("Вы заполнили не все поля");
                    return;
                }

                const newUser = {
                    name: inputName,
                    email: inputEmail,
                    phone: inputPhone,
                    website: inputWebsite,
                }
                postUser(newUser, (e)=>{
                    console.log(e);
                })
                createNewCard(newUser)
                form.reset();
            })

    })

    xhr.send();






