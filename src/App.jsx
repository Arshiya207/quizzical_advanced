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
  const [numOfQuestions, setNumOfQuestions] = React.useState(0);
  const [unanswered, setUnanswered] = React.useState(0);
  const [correctAnswers, setCorrectAnswers] = React.useState(0);
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
  function resetToDefaultValues() {
    setStartGame(false);
    setIsLoading(false);
    setLoadingOver(false);
    setQuestions([]);
    setQuestionUrl("");
  }

  //end helper functions
  // event handler functions
  function toggleDarkMode() {
    setDarkMode((preValue) => !preValue);
  }
  function goBack() {
    if (page === 0) return;
    setStartGame(false);
    setLoadingOver(false);
    setIsLoading(false);
    setQuestionUrl("");
    setQuestions([]);
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
  function flipAnswer(anID, qID) {
    if (!startGame) return;
    setQuestions((prevQuestions) => {
      const qCopy = [...prevQuestions];

      return qCopy.map((q) => {
        if (q.qID === qID) {
          const newAnswers = q.answers.map((an) => {
            if (an.anID !== anID) an.isSelected = false;
            if (an.anID === anID) {
              return { ...an, isSelected: !an.isSelected };
            } else {
              return an;
            }
          });
          const isAnswered = newAnswers.some((an) => {
            if (an.isSelected) return true;
            else return false;
          });
          const isAnsweredCorrect = newAnswers.some((an) => {
            if (an.isSelected && an.isTrue) return true;
            else return false;
          });

          return {
            ...q,
            answers: newAnswers,
            isAnswered: isAnswered,
            isAnswered_correctly: isAnsweredCorrect,
          };
        } else {
          return q;
        }
      });
    });
  }

  function checkAnswers() {
    let correctAnswers = 0;
    let unanswered = 0;

    for (let i = 0; i < questions.length; i++) {
      if (questions[i].isAnswered_correctly) {
        correctAnswers += 1;
      } else if (!questions[i].isAnswered) {
        unanswered += 1;
      }
    }

    setCorrectAnswers(correctAnswers);
    setUnanswered(unanswered);
    setStartGame(false);
  }

  function retry() {
    setStartGame(true);
    setIsLoading(false);
    setLoadingOver(false);
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
    if (questionUrl !== "" && startGame === true) {
      async function getQuestions() {
        setIsLoading(true);
        let results;
        try {
          let response = await fetch(questionUrl);
          const data = await response.json();
          results = data.results;
          if (data.results === undefined)
            throw Error("there is an error fetching data");
        } catch (error) {
          alert("there is an error: " + error);
          resetToDefaultValues();
          return;
        }
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
        if (newQArray.length === 0) {
          alert(
            "there is not enough questions with your specified values. change your input"
          );
          resetToDefaultValues();
          return;
        }
        setQuestions(newQArray);
        setNumOfQuestions(newQArray.length);
        goForward();
        setLoadingOver(true);
      }

      getQuestions();
    }
  }, [startGame]);
  //end use effects
  console.log(questions);
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
          <QuestionP
            questions={questions}
            goBack={goBack}
            flipAnswer={flipAnswer}
            checkAnswers={checkAnswers}
            startGame={startGame}
            unanswered={unanswered}
            correctAnswers={correctAnswers}
            numOfQuestions={numOfQuestions}
            retry={retry}
          />
        )
      ) : (
        <Loading loadingOver={loadingOver} endLoading={endLoading} />
      )}

      <div className="violet-particle"></div>
    </div>
  );
}
