import StartP from "./components/StartP";
import DarkModeBtn from "./components/DarkModeBtn";
import CreateQP from "./components/CreateQP";
import QuestionP from "./components/QuestionP";
import Loading from "./components/Loading";
import React, { useEffect } from "react";
import he from "he";
import { nanoid } from "nanoid";

export default function App() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [startGame, setStartGame] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [questionUrl, setQuestionUrl] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadingOver, setLoadingOver] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  // helper functions

  function randomizeArray(array) {
    for (let i = 0; i < array.length; i++) {
      const destIndex = Math.floor(Math.random() * array.length);
      const currentValue = array[i];
      array[i] = array[destIndex];
      array[destIndex] = currentValue;
    }
    return array;
  }

  //end helper functions
  // event handler functions
  function toggleDarkMode() {
    setDarkMode((preValue) => !preValue);
  }
  function goBack() {
    if (page === 0) return;
    setPage((prePage) => prePage - 1);
  }
  function goForward() {
    if (page === 2) return;
    setPage((prePage) => prePage + 1);
  }
  function startG(inputs) {
    const urlInputs = inputs;
    let urlString = "https://opentdb.com/api.php?";
    if (
      urlInputs.amount === "" ||
      Number(urlInputs.amount) >= 50 ||
      Number(urlInputs.amount) === 0
    ) {
      alert("invalid amount");
      return;
    }
    for (const inputName in urlInputs) {
      if (urlInputs[inputName] !== "") {
        urlString += `${inputName}=${urlInputs[inputName]}&`;
      }
    }
    setQuestionUrl(urlString.slice(0, -1));

    setStartGame(true);
  }
  function endLoading() {
    setIsLoading(false);
  }

  // end event functions

  //use effects
  useEffect(() => {
    const darkModeIconEle = document.querySelector(".dark-mode__icon");
    const html = document.querySelector("[data-theme]");
    const sunClass = "bi-sun-fill";
    const moonClass = "bi-moon-stars-fill";

    if (darkMode) {
      darkModeIconEle.classList.remove("light-transition");

      darkModeIconEle.classList.add("dark-transition");
      darkModeIconEle.classList.remove(moonClass);
      darkModeIconEle.classList.add(sunClass);
      html.dataset.theme = "dark";
    } else {
      darkModeIconEle.classList.remove("dark-transition");

      darkModeIconEle.classList.add("light-transition");
      darkModeIconEle.classList.remove(sunClass);
      darkModeIconEle.classList.add(moonClass);
      html.dataset.theme = "light";
    }
  }, [darkMode]);

  useEffect(() => {
    if (questionUrl) {
      async function getQuestions() {
        setIsLoading(true);
        let response = await fetch(questionUrl);
        const data = await response.json();
        const results = data.results;
        const newQArray = [];

        results.forEach((q) => {
          const redefinedObj = {
            question: he.decode(q.question),
            qID: nanoid(),
            isAnswered: false,
            isAnswered_correctly: false,
            answers: [
              {
                text: he.decode(q.correct_answer),
                isTrue: true,
                isSelected: false,
                anID: nanoid(),
              },
            ],
          };
          q.incorrect_answers.forEach((inA) => {
            redefinedObj.answers.push({
              text: he.decode(inA),
              isTrue: false,
              isSelected: false,
              anID: nanoid(),
            });
          });

          redefinedObj.answers = randomizeArray(redefinedObj.answers);
          newQArray.push(redefinedObj);
        });

        setQuestions(newQArray);
        goForward();
        setLoadingOver(true);
      }

      getQuestions();
    }
  }, [startGame]);
  //end use effects

  return (
    <div className="container">
      <DarkModeBtn toggleDarkMode={toggleDarkMode} />
      <div className="yellow-particle"></div>

      {!isLoading ? (
        page === 0 ? (
          <StartP goForward={goForward} />
        ) : page === 1 ? (
          <CreateQP goBack={goBack} goForward={goForward} startG={startG} />
        ) : (
          <QuestionP questions={questions} />
        )
      ) : (
        <Loading loadingOver={loadingOver} endLoading={endLoading} />
      )}
      {/* <QuestionP questions={questions} /> */}
      <div className="violet-particle"></div>
    </div>
  );
}
