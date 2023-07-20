//* Получить пользователей (users) от сервера https://jsonplaceholder.typicode.com.
//* получив ответ от сервера, вывести имена пользователей на страницу.
//! При клике на имя пользователя, в произвольном месте должна появиться подробная информация о нем.



const xhr = new XMLHttpRequest();

xhr.open("GET", "https://jsonplaceholder.typicode.com/users")






xhr.addEventListener('load', ()=>{
    //! DATA


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
               fragment.appendChild(li)
           }
        }
    })
    const list = document.createElement('ul');
    list.classList.add('list-group');
    list.appendChild(fragment);

    return list;

}
//! UI ELEMENTS

    const container = document.createElement('div');
    container.classList.add("container");
    const listNames = createListNames(objOfUsers)


//! EVENTS
    container.appendChild(listNames)
    document.body.appendChild(container)

        function createNewCard(user){
           const card = document.createElement('div');
           const cardBody = document.createElement('div');
           const cardTitle = document.createElement('h5');
           const list = document.createElement('ul');
           const listItem = document.createElement('li');

            card.classList.add('card');
            cardBody.classList.add('cardBody');
            cardTitle.classList.add('card-title');
            list.classList.add('list-group');
            listItem.classList.add('list-group-item');




            const fragment = document.createDocumentFragment()


        }


})

xhr.send()

