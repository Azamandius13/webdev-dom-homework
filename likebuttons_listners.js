import { comments } from "./api.js";
import { renderComments } from "./rendercomments.js";

export function delay(interval = 300) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, interval);
    });
  }
  
  export const likebuttonListners = (likebuttonElements) => {
    for(const likebuttonElement of likebuttonElements) {
      likebuttonElement.addEventListener("click" , (event) => {
        likebuttonElement.classList.add("-loading-like");
        delay(3000).then(() => {
          likebuttonElement.classList.remove("-loading-like");
          event.stopPropagation();
          if ( comments[likebuttonElement.dataset.index].isLike === false ) {
            comments[likebuttonElement.dataset.index].likeCounter = comments[likebuttonElement.dataset.index].likeCounter + 1;
            comments[likebuttonElement.dataset.index].isLike = true;
          } else if ( comments[likebuttonElement.dataset.index].isLike === true ) {
            comments[likebuttonElement.dataset.index].isLike = false;
            comments[likebuttonElement.dataset.index].likeCounter = comments[likebuttonElement.dataset.index].likeCounter - 1;
          }
          renderComments();
        })               
      })
    }
  }