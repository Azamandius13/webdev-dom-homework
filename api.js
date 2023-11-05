import { renderComments } from "./rendercomments.js";
export const commentloaderElement = document.querySelector('.comment-loader-text')
export const addcommentText = document.querySelector('.add-comment-text');
export const containerElement = document.querySelector('.add-form');
export const massageinputElement = document.querySelector('.add-form-text');
export const nameinputElement = document.querySelector('.add-form-name');
export let comments = [];

export function functionDateConverter(date){
  return date.getDate()+ "." + date.getMonth() + "." + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
  }

export function apiFetchGet() {
        return fetch("https://wedev-api.sky.pro/api/v1/artemiy-babichev/comments" , {
        method : "GET"
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
            console.log(error);
            alert("Нет интернет соединения");
            commentloaderElement.textContent = "Нет интернет соединения";
          })
    }   
    
export function apiFetchPOST(text , name) {
  return fetch("https://wedev-api.sky.pro/api/v1/artemiy-babichev/comments" , {
      method : "POST",
      body : JSON.stringify({
        forceError: true,
        text : text,
        name : name,
      })
   })
}


export function fetchPOSTGET() {
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
        return fetch("https://wedev-api.sky.pro/api/v1/artemiy-babichev/comments" , {
      method : "GET"
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
    
