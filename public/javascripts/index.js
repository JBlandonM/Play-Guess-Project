document.body.onload = async () => {
  fetchData();
};
// getting the "dataBase= localFile" with the characters info
const fetchData = async () => {
  try {
    var res = await fetch("/char");
    var charData = await res.json();
    console.log(charData);
    showRandom(charData);
  } catch (error) {
    console.log(error);
  }
};
// from the local data, show a new image and options, on load,
// and for each click in some option.
var showRandom = async (charData) => {
  try {
    var number = Math.floor(Math.random() * charData.length);
    let imgToInsert = await charData[number].imageUrl;
    let img = document.querySelector(".char");
    img.setAttribute("src", imgToInsert);
    let imgAlt = await charData[number].name;
    img.setAttribute("alt", imgAlt);
  } catch (error) {
    console.log(error);
  }
  // insert 4 options, one right.
  let options = document.querySelectorAll(".option");
  var rightOpt = number;
  options.forEach((option) => {
    option.innerHTML = charData[rightOpt].name;
    rightOpt = Math.floor(Math.random() * charData.length);
  });
};

// stored 4 possible options from the DOM
var buttonOne = document.querySelector(".one");
var buttonTwo = document.querySelector(".two");
var buttonThree = document.querySelector(".three");
var buttonFour = document.querySelector(".four");

// calling aboves functions for each possible option
buttonOne.addEventListener("click", async () => {
  checkSelected(buttonOne);
  requestInputs(buttonOne);
  setTimeout(() => {
    fetchData();
  }, 600);
});
buttonTwo.addEventListener("click", async () => {
  checkSelected(buttonTwo);
  requestInputs(buttonTwo);
  setTimeout(() => {
    fetchData();
  }, 600);
});
buttonThree.addEventListener("click", async () => {
  checkSelected(buttonThree);
  requestInputs(buttonThree);
  setTimeout(() => {
    fetchData();
  }, 600);
});
buttonFour.addEventListener("click", async () => {
  checkSelected(buttonFour);
  requestInputs(buttonFour);
  setTimeout(() => {
    fetchData();
  }, 600);
});
var score = 0;
var fails = 3;
const checkSelected = (btnClicked) => {
  var imgChar = document.querySelector(".char");
  let displayed = imgChar.getAttribute("alt"); // store image displayed attribute "alt"(the string with the correct option)
  let buttonText = btnClicked.getInnerHTML(); // also the button clicked string
  let card = document.querySelector("#card");
  let scoreTxt = document.querySelector("#score");
  let failsTxt = document.querySelector("#attempts");
  if (displayed === buttonText) {
    btnClicked.classList.add("right-op");
    card.classList.add("card-color-right");
    score += 1;
    scoreTxt.innerHTML = score;
    console.log(score);
    // score = Number(scoreTxt);
    // scoreTxt.innerHTML = score;
  } else {
    btnClicked.classList.add("wrong-op");
    card.classList.add("card-color-wrong");
    fails -= 1;
    failsTxt.innerHTML = fails;
  }
  setTimeout(() => {
    btnClicked.classList.remove("right-op");
    btnClicked.classList.remove("wrong-op");
    card.classList.remove("card-color-wrong");
    card.classList.remove("card-color-right");
  }, 1000);
};

// for each possible option, on its "click" run this
const requestInputs = async (btnClicked) => {
  try {
    var imgChar = document.querySelector(".char").getAttribute("alt"); // store image displayed attribute "alt"(the string with the correct option)
    var buttonText = btnClicked.getInnerHTML(); // also the button clicked string
    var options = {
      // setting customs option to the request
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // data to send "onclick"
        charDisplayed: imgChar,
        optionSelected: buttonText,
      }),
    };
    // using "fetch API" to send a request to backend
    let result = await fetch("/send", options);
    // receiving a response from backend
    result = await result.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

