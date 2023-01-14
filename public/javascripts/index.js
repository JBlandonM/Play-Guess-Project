// state variables
let currentChar = 0;
let currentOptions = [];
let imgHistory = [];
let optionHistory = [];
let points = 0;

const fetchData = async (category) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`/char/${category}`);
      resolve(await res.json());
    } catch (error) {
      reject(error);
    }
  });

const optionToShow = (characters) => {
  while (characters && currentOptions.length < 4) {
    let randomNum = Math.floor(Math.random() * characters.length);
    if (!optionHistory.includes(characters[randomNum])) {
      currentOptions.push(randomNum);
      optionHistory.push(characters[randomNum]);
    }
  }
  // console.log(`current options: ${currentOptions}`);
};

const imgToShow = (currentOptions, characters) => {
  try {
    let randomNum = Math.floor(Math.random() * currentOptions.length);
    if (!imgHistory.includes(characters[currentOptions[randomNum]])) {
      imgHistory.push(characters[currentOptions[randomNum]]);
      // console.log("History:", imgHistory);
      // console.log("current:", characters[currentOptions[randomNum]]);
      return currentOptions[randomNum];
    }
  } catch (error) {
    console.log(error);
  }
};

const endMatch = async (imgHistory) => {
  if (imgHistory.length >= 15) {
    console.log("Match should end");
    option = {
      Headers: {
        "content-type": "text/html",
      },
    };
    loading("block", "hidden");
    let response = await (await fetch(`match/point/${points}`, option)).text();
    // console.log(response);
    let father = document.querySelector("#card");
    father.innerHTML = response;
    loading("none", "visible");
    history.pushState(null, "", "game/score");
  } else {
    console.log("continue");
  }
};
const update = async () => {
  var imgElement = document.querySelector(".char");
  let buttonsElements = document.querySelectorAll(".option");
  let pointsCounter = document.querySelector("#score");
  // console.log("------------------------------");
  // console.log("Characters length:", characters.length);
  await optionToShow(characters);

  let position = await imgToShow(currentOptions, characters);

  let charToShow = characters[position];
  // console.log(charToShow);

  imgElement.setAttribute("src", charToShow.imageUrl);
  imgElement.setAttribute("alt", charToShow.name);
  pointsCounter.textContent = points;
  buttonsElements[0].textContent = characters[currentOptions[0]].name;
  buttonsElements[1].textContent = characters[currentOptions[1]].name;
  buttonsElements[2].textContent = characters[currentOptions[2]].name;
  buttonsElements[3].textContent = characters[currentOptions[3]].name;
  characters.splice(position, 1);
  // console.log("left:", characters);

  currentOptions = [];
  optionHistory = [];
  endMatch(imgHistory);
};

const checkAnswers = (buttonClicked) => {
  const imageShown = document.querySelector(".char").getAttribute("alt");
  let card = document.querySelector("#card");
  if (imageShown === buttonClicked.textContent) {
    card.classList.add("card-color-right");
    points += 1;
    console.log(points);
  } else {
    card.classList.add("card-color-wrong");
  }
  setTimeout(() => {
    card.classList.remove("card-color-right");
    card.classList.remove("card-color-wrong");
  }, 700);
};

const loading = (display, display0) => {
  document.querySelector("#card").style.visibility = display0;
  document.querySelector("#loader").style.display = display;
};

const categoryButtons = document.querySelectorAll(".charCatgry");
const subContainer = document.querySelector("#card");
var characters = 0;
categoryButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    loading("block", "hidden");
    const response = await fetch("/match/startView");
    const view = await response.text();
    characters = await fetchData(button.textContent);
    loading("none", "visible");
    while (subContainer.firstChild) {
      subContainer.removeChild(subContainer.firstChild);
    }
    subContainer.innerHTML = view;

    const buttonOptions = document.querySelectorAll(".option");

    update();

    buttonOptions.forEach((button) => {
      button.addEventListener("click", () => {
        button.disabled = true;
        checkAnswers(button);
        setTimeout(() => {
          update();
          button.disabled = false;
        }, 600);
      });
    });
  });
});
