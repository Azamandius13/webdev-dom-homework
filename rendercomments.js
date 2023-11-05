import { comments } from "./api.js";
import { doneImgButtonListnes } from "./doneimgListners.js";
import { likebuttonListners } from "./likebuttons_listners.js";
import { editbuttonListners } from "./editButtonsListners.js";
import { quoteElementsListners } from "./quoteListners.js";
export const comments_containerElement = document.querySelector('.comments');

export const renderComments = () => {
    const commentshtml = comments.map((comment , index) => {
      let isEditClass;
      let massageHideClass;
      let doneHideClass;
      if ( comments[index].isEdit === true){
        isEditClass = "display-none"
        massageHideClass = ""
        doneHideClass = "display-none"
      } else {
        isEditClass = ""
        massageHideClass = "display-none"
        doneHideClass = ""
  
      }
  
      return `
      <li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
           <textarea
                type="textarea"
                class="add-form-text addformedit ${isEditClass}"
                placeholder="Введите ваш коментарий"
                rows="4"
            >${comments[index].massage}</textarea>
            <img class ="doneimg ${doneHideClass}" src="img/done.png" data-index="${index}">
          <div class="comment-text ${massageHideClass}" data-index="${index}">
            ${comment.massage}
            <img class ="editimg" src="img/edit.png" data-index="${index}">
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likeCounter}</span>
            <button class="like-button ${(comments[index].isLike)? "active-like" :"" }" data-index="${index}" data-like="${comment.isLike}"></button>
            </div>
        </div>
      </li>`  
    }).join("").replaceAll('*quoteBegin*','<div class="quote_container"> ' ).replaceAll('*quoteEnd*','</div>' );
    comments_containerElement.innerHTML = commentshtml;
  
    
    
    
    
    
    
    
    
    
    
    
    
    const likebuttonElements = document.querySelectorAll('.like-button')
    
    
    likebuttonListners(likebuttonElements);
    editbuttonListners();
    doneImgButtonListnes();
    quoteElementsListners();
  }
  


