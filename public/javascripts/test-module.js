// "loading" unit activates and disables a page loader element
export const loading = (elemX, stX, elemY, stY) => {
  document.querySelector(elemX).style.display = stX;
  document.querySelector(elemY).style.display = stY;
};
export const setFadeOut = () => {
  document.querySelector("#card").classList.add("new-card");
  setTimeout(() => {
    document.querySelector("#card").classList.remove("new-card");
  }, 900);
};

//dark scheme mode handler
const DarkMode = () => {
  let condition =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (condition) {
    // main color
    let body = document.querySelector(".main-container");
    body.style.backgroundColor = "initial";
    body.style.color = "whiteSmoke";
    // main card container opacity
    let card = document.querySelector("#card");
    card.style.opacity = "0.5";
  }
};
DarkMode();
