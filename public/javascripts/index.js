// state variables
let currentChar = 0;
let currentOptions = [];
let imgHistory = [];
let optionHistory = [];
let points = 0;
let test = "";

// to get characters data from mongo db, specified by category
const fetchData = async (category) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`/char/${category}`);
      resolve(await res.json());
    } catch (error) {
      reject(error);
    }
  });

// this checks the following: the 4 index characters positions that will be inside buttons, might be different
// it stores 4 different characters names within an array
const optionToShow = (characters) => {
  while (characters && currentOptions.length < 4) {
    let randomNum = Math.floor(Math.random() * characters.length);
    if (!optionHistory.includes(characters[randomNum])) {
      currentOptions.push(randomNum);
      optionHistory.push(characters[randomNum]);
    }
  }
};

// imgToShow uses the array with 4 different characters and returns one, making sure that this one is not already shown before
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

// this unit checks after each dom update, if the user have played 15 "cards": if true, fetch an "endView", and then prints it in browser.
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
    window.onbeforeunload = () => {
      return none;
    };
  } else {
    console.log("continue");
  }
};

// this is the main unit of the game, this uses each above unit to handle the match flow
const update = async () => {
  // selects from dom the img element to render a character, also the buttons, and a "score"
  var imgElement = document.querySelector(".char");
  let buttonsElements = document.querySelectorAll(".option");
  let pointsCounter = document.querySelector("#score");
  // console.log("------------------------------");
  // console.log("Characters length:", characters.length);
  await optionToShow(characters);

  let position = await imgToShow(currentOptions, characters);

  let charToShow = characters[position];
  // console.log(charToShow);

  // inserts the current character image, and further inserts the one different character options in each button element
  imgElement.setAttribute("src", charToShow.imageUrl);
  imgElement.setAttribute("alt", charToShow.name);
  pointsCounter.textContent = points;
  buttonsElements[0].textContent = characters[currentOptions[0]].name;
  buttonsElements[1].textContent = characters[currentOptions[1]].name;
  buttonsElements[2].textContent = characters[currentOptions[2]].name;
  buttonsElements[3].textContent = characters[currentOptions[3]].name;
  // from match characters array, "removes" the already displayed char
  characters.splice(position, 1);

  // restart this state variables before all dom update
  currentOptions = []; // stores 4 different characters positions to show inside buttons
  optionHistory = [];
  endMatch(imgHistory);
};

// this checks if the button selected contains the correct answer, if true displays some styles, else displays others
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

// "loading" unit activates and disables a page loader element
const loading = (display, display0) => {
  document.querySelector("#card").style.visibility = display0;
  document.querySelector("#loader").style.display = display;
};

// from main index view selects the category buttons and a container element
const categoryButtons = document.querySelectorAll(".charCatgry");
const subContainer = document.querySelector("#card");

// creates an onclick event listener for each category, when one is clicked fetch specified data from a category
// also fetch a matchStart view, this works to display the data while match is played
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
    window.onbeforeunload = (e) => {
      return "";
    };
    update();
    // for each characters displayed and option selected, calls the update function, disables buttons by a second, and calls checkAnswers function
    buttonOptions.forEach((button) => {
      button.addEventListener("click", () => {
        // button.disabled = true;
        buttonOptions.forEach((button) => {
          button.disabled = true;
        });
        checkAnswers(button);
        setTimeout(() => {
          update();
          buttonOptions.forEach((button) => {
            button.disabled = false;
          });
        }, 600);
      });
    });
  });
});
