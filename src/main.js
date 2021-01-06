 


// import axios from 'axios'

// class API {
//     static async getUserInfo(username){
//         try {
//             const response = await axios.get(`http://api.github.com/users/${username}`)

//             console.log(response);
//         } catch(err) {
//             console.warn('Erro na API');
//         }
//     }
// }
// API.getUserInfo('MatheusF99')



// const minhaPromise = () => new Promise((resolve,reject) =>{
//     setTimeout(() => { resolve('ok')}, 2000);
// })
// //#region 

// async function execPromise (){
//     console.log(await minhaPromise());
//     console.log(await minhaPromise() + "teste");
//     console.log(await minhaPromise());
// }

// execPromise();
// //#endregion
/*
 - fazer uma classer pra controlar a aplicação
 - um contructo praa iniciar a variaveel repositorio com um array vazio
 - adionar uma referencia para o lelemnto repor-form
 - fazer uma fnção registrerhandler para registra os eventos - colocar um elemento que ouça qnd o ususario enviar algo do submit 
  - e um register repository 
*/
/*
 -referencia para a ul
 - 
*/

import api from './api'

class App {

    constructor(){
        this.repository = [];

        this.formEl = document.getElementById('repoForm');
        this.listEl = document.querySelector('ul#repo-List')
        this.inputEl = document.querySelector('input[name=repositorio]')
        
        this.registerHandlers();
    }

    registerHandlers(){
        this.formEl.onsubmit = event => this.addRepository(event)
    }



    async addRepository(event){
        event.preventDefault();

        const repoInput = this.inputEl.value

        if(repoInput.length === 0)
            return;

        const response = await api.get(`/users/${repoInput}`)

        console.log(response);

        const { name, bio, html_url, avatar_url, location} = response.data

        this.repository.push({
            name,
            bio,
            avatar_url,
            html_url,
            location,
        });

        console.log(this.repository)
        this.render();
    }

    render() {
         this.listEl.innerHTML = '';

        this.repository.forEach(repo => {

            let ImgEl = document.createElement('img');
            ImgEl.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.bio));

            let locationEl = document.createElement('p');
            locationEl.appendChild(document.createTextNode(repo.location));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.setAttribute('href', repo.html_url)
            linkEl.appendChild(document.createTextNode('Acessar'));
            
            let listItemEl = document.createElement('li');
            listItemEl.appendChild(ImgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl);
        });
    }
}
new App();