import { comments } from "./api.js";
import { renderComments } from "./rendercomments.js";

export const doneImgButtonListnes = () => {
  const donebuttonElements = document.querySelectorAll(".doneimg");
  for (const donebuttonElement of donebuttonElements) {
    donebuttonElement.addEventListener("click", (event) => {
      event.stopPropagation();
      const addformTextEdit = document.querySelectorAll(".addformedit");
      comments[donebuttonElement.dataset.index].massage = addformTextEdit[
        donebuttonElement.dataset.index
      ].value
        .replaceAll('<div class="quote_container"> ', "*quoteBegin*")
        .replaceAll("</div>", "*quoteEnd*");
      comments[donebuttonElement.dataset.index].isEdit = true;
      renderComments();
    });
  }
};
