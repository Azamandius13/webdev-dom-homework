
import { comments } from "./api.js";
import { renderComments } from "./rendercomments.js";

export const massageinputElement = document.querySelector('.add-form-text');

export const quoteElementsListners = () => {
    const quoteElements = document.querySelectorAll(".comment-text");
    for ( const quoteElement of quoteElements ) {
     quoteElement.addEventListener("click" , () => {
       massageinputElement.value ="*quoteBegin*" + comments[quoteElement.dataset.index].massage + "\n"+ comments[quoteElement.dataset.index].name + "*quoteEnd*" + "\n" ;
       renderComments();
     })
    }
}
 