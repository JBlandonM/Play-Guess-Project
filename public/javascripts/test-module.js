// "loading" unit activates and disables a page loader element
export const loading = (elemX, stX, elemY, stY) => {
  document.querySelector(elemX).style.display = stX;
  document.querySelector(elemY).style.display = stY;
};
export const setFadeOut =() => {
  document.querySelector("#card").classList.add("new-card");
  setTimeout(() => {
    document.querySelector("#card").classList.remove("new-card");
  }, 900);
};
