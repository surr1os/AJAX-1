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
                       const card = document.querySelector('.card')
                       userInfoContainer.removeChild(card);
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
           // const listItems = document.createDocumentFragment()
           //  const listItem = document.createElement('li');
            card.classList.add("card", "m-auto", "mt-3", "text-center");
            card.style.width = '40rem'
            card.setAttribute("data-card-id", user.id)
            cardBody.classList.add('card-body');
            cardText.classList.add('card-text')
            cardTitle.classList.add('card-title');
            list.classList.add('list-group');
            // listItem.classList.add('list-group-item');

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
})

xhr.send()

