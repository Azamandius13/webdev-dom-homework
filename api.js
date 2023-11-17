import { renderComments } from "./rendercomments.js";
import { addFormContainerElement } from "./main.js";
import { format } from "date-fns";

export const commentloaderElement = document.querySelector('.comment-loader-text')
export const addcommentText = document.querySelector('.add-comment-text');
export const containerElement = document.querySelector('.add-form');
export const massageinputElement = document.querySelector('.add-form-text');
export const nameinputElement = document.querySelector('.add-form-name');
export let comments = [];


let token;
export function setToken(newtoken) {
  token = newtoken;

}

export const setName = (userNameAuth) => {
  nameinputElement.value = userNameAuth;
}


export function functionDateConverter(date){
  return date.getDate()+ "." + date.getMonth() + "." + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
  }

export function apiFetchGet() {
        return fetch("https://wedev-api.sky.pro/api/v2/artemiybabichev/comments" , {
        method : "GET",
        headers: {
          Authorization : `Bearer ${token}`
        },
      })
      .then((response) => {
          return response.json()
      }).then((response) => {
        addcommentText.classList.add("display-none");
        containerElement.classList.remove("display-none");
        return response;
      })
      .then((responseData) => {
               let appComments = responseData.comments.map((comment) => {
                return {
                  name: comment.author.name,
                  date: format(new Date(comment.date) , 'yyyy-MM-dd hh.mm.ss' ),
                  massage : comment.text,
                  isLike : comment.isLiked,
                  likeCounter : comment.likes,
                  isEdit: true
                }
              })
    
              comments = appComments;
              renderComments();
          })
          .then((response) => {
          commentloaderElement.classList.add('display-none');
          return response;
          })
          .catch((error) => {
            console.log(error);
            alert("Нет интернет соединения");
            commentloaderElement.textContent = "Нет интернет соединения";
          })
    }   
    
export function apiFetchPOST(text , name) {
  return fetch("https://wedev-api.sky.pro/api/v2/artemiybabichev/comments" , {
      method : "POST",
      headers: {
        Authorization : `Bearer ${token}`
      },
      body : JSON.stringify({
        text : text,
        name : name,
      })
   })
}


export function fetchPOSTGET() {

  

  addFormContainerElement.innerHTML = `
  <div class="add-form">
  <input
    type="text"
    class="add-form-name"
    placeholder="Введите ваше имя"
    value = "${nameinputElement.value}"
    disabled
  />
  <textarea
    type="textarea"
    class="add-form-text"
    placeholder="Введите ваш коментарий"
    rows="4"
  ></textarea>
  <div class="add-form-row">
    <button class="add-form-button">Написать</button>
  </div>
  <button class="deletelastcomment">Удалить последний комментарий</button>
</div>`



  apiFetchPOST(massageinputElement.value, nameinputElement.value).then((response) => {
    if (response.status === 400) {
        throw new Error("Поле Имени и Комментариев должно быть больше 3х");

    }else if (response.status === 500){
      throw new Error("Сервер Упал");
    }else {
      nameinputElement.value = "";
      massageinputElement.value = "";
      nameinputElement.classList.remove("errorinput");
      massageinputElement.classList.remove("errorinput");
      }
    }).then(() => {
        return fetch("https://wedev-api.sky.pro/api/v2/artemiybabichev/comments" , {
      method : "GET",
      headers: {
        Authorization : `Bearer ${token}`
      },
    })
    })
    .then((response) => {
        return response.json()
    })
    .then((response) => {
      addcommentText.classList.add("display-none");
      containerElement.classList.remove("display-none");
      return response;
    })
    .then((responseData) => {
            let appComments = responseData.comments.map((comment) => {
              return {
                name: comment.author.name,
                date: functionDateConverter(new Date(comment.date)),
                massage : comment.text,
                isLike : comment.isLiked,
                likeCounter : comment.likes,
                isEdit: true
              }
            })

            comments = appComments;
            renderComments();
        })
        .then((response) => {
        commentloaderElement.classList.add('display-none');
        return response;
        })
        .catch((error) => {
          console.log(error)
          if ( error.message === "Failed to fetch"){
            alert("Нет интернет соединения");
            containerElement.classList.remove('display-none');
            addcommentText.classList.add("display-none");
          }else {
          alert(error.message);
          containerElement.classList.remove('display-none');
          addcommentText.classList.add("display-none");
          }
        })
      }




      

      export function login({login, password}) {
        return fetch("https://wedev-api.sky.pro/api/user/login" , {
            method : "POST",
            body : JSON.stringify({
              login,
              password,
            })
         })
         .then((response) => {
          if(response.status === 400) {
            alert('Не верный логин или пароль')
          }else {
            return response.json()
          }
         })
      }
    
     

    
      