import {apiFetchGet} from "./api.js"
import { addcommentText } from "./api.js";
import { comments } from "./api.js";
import { containerElement } from "./api.js";
import { fetchPOSTGET } from "./api.js";
import { massageinputElement } from "./api.js";
import { nameinputElement } from "./api.js";
import { renderComments } from "./rendercomments.js";

const comments_containerElement = document.querySelector('.comments');
const massage_sendButton = document.querySelector('.add-form-button');
const lastcommentDeletebutton = document.querySelector('.deletelastcomment');
massage_sendButton.disabled = true;
const likebuttonElements = document.querySelectorAll('.like-button');
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




