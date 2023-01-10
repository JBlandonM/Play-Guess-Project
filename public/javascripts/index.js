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

const endMatch = async (imgHistory, pointsCounter) => {
  if (imgHistory.length >= 15) {
    console.log("Match should end");
    option = {
      Headers: {
        "content-type": "text/html",
      },
    };
    let response = await (await fetch(`match/point/${points}`, option)).text();
    // console.log(response);
    let father = document.querySelector("#card");
    father.innerHTML = response;
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

const checkAnswers = (imgShown, buttonClicked) => {
  if (imgShown === buttonClicked) {
    points += 1;
    console.log(points);
  }
};

const categoryButtons = document.querySelectorAll(".charCatgry");
const subContainer = document.querySelector("#sub-container");
var characters = 0;
categoryButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const response = await fetch(`/jonathan`);
    const view = await response.text();
    characters = await fetchData(button.textContent);

    while (subContainer.firstChild) {
      subContainer.removeChild(subContainer.firstChild);
    }

    subContainer.innerHTML = view;

    const buttonOptions = document.querySelectorAll(".option");

    update();

    buttonOptions.forEach((button) => {
      button.addEventListener("click", () => {
        button.disabled = true;
        checkAnswers(
          document.querySelector(".char").getAttribute("alt"),
          button.textContent
        );
        update();
        setTimeout(() => {
          button.disabled = false;
        }, 600);
      });
    });
  });
});
