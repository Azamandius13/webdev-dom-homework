import {apiFetchGet} from "./api.js"
import { addcommentText } from "./api.js";
import { comments } from "./api.js";
import { containerElement } from "./api.js";
import { fetchPOSTGET } from "./api.js";
import { massageinputElement } from "./api.js";
import { nameinputElement } from "./api.js";
import { renderComments } from "./rendercomments.js";
import { login , setToken } from "./api.js";
import { setName } from "./api.js";

const comments_containerElement = document.querySelector('.comments');
const massage_sendButton = document.querySelector('.add-form-button');
const lastcommentDeletebutton = document.querySelector('.deletelastcomment');
const authTitleContainer = document.querySelector(".authtitle");
const loginformcontainer = document.querySelector(".loginformcontainer");
export const addFormContainerElement = document.querySelector(".add-form-container")
massage_sendButton.disabled = true;
addcommentText.classList.add("display-none");



apiFetchGet();
renderComments();

function addComment() {
  addcommentText.classList.remove("display-none");
  containerElement.classList.add("display-none");

  let mounthdate;
  if( Number((new Date()).getMonth()) === 10 || Number((new Date()).getMonth()) === 11 || Number((new Date()).getMonth()) === 12 ) {
    mounthdate = (new Date()).getMonth();
}else {
    mounthdate = '0' + (new Date()).getMonth();
}

let massageDate = (new Date()).getDate() + "." + mounthdate  + "." + ((new Date()).getFullYear() - 2000 ) + " " + ((new Date()).getHours()) + ":" + ((new Date()).getMinutes());

  if ( nameinputElement.value === "" &&  massageinputElement.value === "" ){
    nameinputElement.classList.add("errorinput");
    massageinputElement.classList.add("errorinput");
    return
  }else if ( nameinputElement.value === "" ) {
    nameinputElement.classList.add("errorinput");
    return
  }else if ( massageinputElement.value === "" ) {
    massageinputElement.classList.add("errorinput");
    return
  }

  fetchPOSTGET()
  renderComments();
}

massage_sendButton.addEventListener("click" , addComment);

nameinputElement.addEventListener ("input" , () => {
  massage_sendButton.disabled = false;
})

massageinputElement.addEventListener ("input" , () => {
  massage_sendButton.disabled = false;
})

lastcommentDeletebutton.addEventListener ("click", () => {
  comments_containerElement.removeChild(comments_containerElement.lastChild);
})


const renderAuthForm = () => {
  loginformcontainer.innerHTML = `
  <div class="login-form">
        <h2>Форма входа</h2>
        <input
          type="text"
          class="login-input"
          placeholder="Введите Ваш логин"
        />
        <input
          type="password"
          class="password-input"
          placeholder="Введите ваш пароль"
        />
        <div class="add-form-row">
          <a class="regtitle">Нет аккаунта ? <a class="registration_button">Зарегистрируйтесь</a></a>
        </div>
        <button class="auth_button">Авторизоваться</button>
      </div>
      
  ` 

  const auth_button = document.querySelector(".auth_button");
  const loginInputElement = document.querySelector(".login-input");
  const passwordInputElement = document.querySelector(".password-input");
  const loginformElement = document.querySelector(".login-form");


  auth_button.addEventListener("click" , () => {
    addFormContainerElement.classList.remove('display-none');
    loginformElement.classList.add('display-none');
    login({login: loginInputElement.value , password : passwordInputElement.value})
    .then((responseData)=>{
      setToken(responseData.user.token);
      setName(responseData.user.name);
      nameinputElement.value = responseData.user.name;
})     
  })
}


const authoristationTitleButton = document.querySelector('.authorisation_title_button');

authoristationTitleButton.addEventListener("click", () => {
  renderAuthForm();
  authTitleContainer.classList.add('display-none')
})









