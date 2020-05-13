/*-------- Shakhawat Hossain Shawon --------*/
/*-------- Employee Id : 11094 --------*/

// Quiz.js

function Quiz(questions) {
  this.student = "";
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
  this.myAnswers = [];
}

Quiz.prototype.getQuestionIndex = function () {
  return this.questions[this.questionIndex];
};

Quiz.prototype.guess = function (answer) {
  if (this.getQuestionIndex().isCorrectAnswer(answer)) {
    this.score += 10;
  }
};

// Question.js

function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
  return this.answer === choice;
};

// App.js

// Populate Question

function populate() {
  // show question
  var element = document.getElementById("question");
  element.innerHTML = quiz.getQuestionIndex().text;

  // When one question type is populate others types will be hidden
  for (let i = 0; i < 4; i++) {
    if (quiz.questionIndex != i) {
      document.getElementsByClassName("type" + (i + 1))[0].style.display =
        "none";
    } else {
      document.getElementsByClassName("type" + (i + 1))[0].style.display =
        "block";
    }
  }

  //show options
  if (quiz.questionIndex === 1 || quiz.questionIndex === 2) {
    var choices = quiz.getQuestionIndex().choices;
    for (var i = 0; i < choices.length; i++) {
      if (quiz.questionIndex === 1) {
        document.getElementById("radio" + (i + 1)).value = choices[i];
        document.getElementById("radioLabel" + (i + 1)).innerHTML = choices[i];
      } else {
        document.getElementById("checkbox" + (i + 1)).value = choices[i];
        document.getElementById("checkboxLabel" + (i + 1)).innerHTML =
          choices[i];
      }
    }
  }
  showProgress();
}

// Showing Progress
function showProgress() {
  document.getElementById("progress").style.width =
    (quiz.questionIndex + 1) * 25 + "%";
  document.getElementById("progress").innerHTML =
    (quiz.questionIndex + 1) * 25 + "%";

  if (quiz.questionIndex === questions.length - 1) {
    document.getElementsByClassName("next")[0].style.display = "none";
    document.getElementsByClassName("submit")[0].style.display = "block";
  }
}

// Next Question
function nextQuestion() {
  quiz.questionIndex++;
  populate();
}

function answerScriptFun() {
  document.getElementsByClassName("exam")[0].style.display = "none";
  document.getElementsByClassName("AnsScript")[0].style.display = "grid";

  let firstAnswer = "";
  let secondAnswer = "";
  let thirdAnswer = "";
  let fourthAnswer = "";

  firstAnswer = document.getElementById("firstAns").value;
  let items = document.querySelectorAll('input[name="choice"]');
  for (const item of items) {
    if (item.checked) {
      secondAnswer = item.value;
      break;
    }
  }

  items = document.querySelectorAll('input[name="CheckBoxChoice"]');
  let i = 1;
  for (const item of items) {
    if (item.checked) {
      thirdAnswer += i++ + ". " + item.value + " ";
    }
  }
  fourthAnswer = document.getElementById("BroadQuestion").value;

  quiz.myAnswers.push(firstAnswer);
  quiz.myAnswers.push(secondAnswer);
  quiz.myAnswers.push(thirdAnswer);
  quiz.myAnswers.push(fourthAnswer);

  for (let i = 1; i <= 4; i++) {
    document.getElementById("Question" + i).innerHTML = questions[i - 1].text;
    document.getElementById("Answer" + i).innerHTML = quiz.myAnswers[i - 1];
  }

  quiz.questionIndex = 1;
  quiz.guess(secondAnswer);
  if (quiz.score === 10) {
    document
      .getElementById("Answer2")
      .insertAdjacentHTML("afterend", '<span id="rightAns">✔</span>');
  } else {
    document
      .getElementById("Answer2")
      .insertAdjacentHTML("afterend", '<span id="wrongAns">x</span>');
  }
  quiz.questionIndex = 2;
  quiz.guess(thirdAnswer);
  if (quiz.score === 20) {
    document
      .getElementById("Answer3")
      .insertAdjacentHTML("afterend", '<span id="rightAns">✔</span>');
  } else {
    document
      .getElementById("Answer3")
      .insertAdjacentHTML("afterend", '<span id="wrongAns">x</span>');
  }

  document.getElementById("score").innerHTML = "Total Marks : " + quiz.score;
}

function grandTotal() {
  let firstScore = document.getElementById("firstScore").value;
  let fourthScore = document.getElementById("fourthScore").value;
  quiz.score += Number(firstScore) + Number(fourthScore);
  document.getElementById("resultName").innerHTML =
    "Student Name: " + quiz.student;
  document.getElementById("score").innerHTML = "Total Marks : " + quiz.score;
  document.getElementsByClassName("marks")[0].style.display = "none";
  document.getElementsByClassName("checkBtn")[0].style.display = "none";

  if (Number(firstScore) === 0) {
    document
      .getElementById("Answer1")
      .insertAdjacentHTML("afterend", '<span id="wrongAns">x</span>');
  } else if (Number(firstScore) > 0 && Number(firstScore) < 10) {
    document
      .getElementById("Answer1")
      .insertAdjacentHTML("afterend", '<span id="partialAns"> ! </span>');
  } else if (Number(firstScore) === 10) {
    document
      .getElementById("Answer1")
      .insertAdjacentHTML("afterend", '<span id="rightAns">✔</span>');
  }

  if (Number(fourthScore) === 0) {
    document
      .getElementById("Answer4")
      .insertAdjacentHTML("afterend", '<span id="wrongAns">x</span>');
  } else if (Number(fourthScore) > 0 && Number(fourthScore) < 10) {
    document
      .getElementById("Answer4")
      .insertAdjacentHTML("afterend", '<span id="partialAns"> ! </span>');
  } else if (Number(fourthScore) === 10) {
    document
      .getElementById("Answer4")
      .insertAdjacentHTML("afterend", '<span id="rightAns">✔</span>');
  }
}

// create questions
var questions = [
  new Question(
    "What is the maximum number of records we can get in SOQL query?",
    [],
    "50000"
  ),
  new Question(
    "What is the time complexity of Depth First Search?",
    ["O(n)", "O(n^2)", "O(V+E)", "O(log n)", "O(n!)"],
    "O(V+E)"
  ),
  new Question(
    "Which is the Sandbox type ?",
    [
      "Developer",
      "Small copy",
      "Partial copy",
      "Sandbox pro",
      "Salesforce pro",
    ],
    "1. Developer 2. Partial copy "
  ),
  new Question(
    "What is managed and unmanaged packages in Salesforce?",
    [],
    "They are of two types  - Managed and Unmanaged. Managed are the ones where the Code is Hidden and Can be easily Upgraded or Pushed with new updates to the code. Whereas Unmanaged Packages have the Code Visible and can be edited by the Org in which it has been installed. Unmanaged Packages cannot be Upgraded or Pushed - they are like one time coded."
  ),
];

function EnterName() {
  document.getElementsByClassName("NameClass")[0].style.display = "none";
  document.getElementsByClassName("progress")[0].style.display = "block";
  document.getElementsByClassName("exam")[0].style.display = "block";
  quiz.student = document.getElementById("yourName").value;
}

var quiz = new Quiz(questions);
populate();
