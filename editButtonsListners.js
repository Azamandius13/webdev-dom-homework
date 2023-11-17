import { comments } from "./api.js";
import { renderComments } from "./rendercomments.js";

export const editbuttonElements = document.querySelectorAll(".editimg");

export const editbuttonListners = () => {
  const editbuttonElements = document.querySelectorAll(".editimg");
  for (const editbuttonElement of editbuttonElements) {
    editbuttonElement.addEventListener("click", (event) => {
      event.stopPropagation();
      comments[editbuttonElement.dataset.index].isEdit = false;
      renderComments();
    });
  }
};
