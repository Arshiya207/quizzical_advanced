import React from "react";
import Question from "./Question";
export default function QuestionP(props) {
  const checkAnswerDes = `you have ${props.correctAnswers}/${
    props.numOfQuestions
  } correct ${props.correctAnswers > 1 ? "answers" : "answer"}, ${
    props.unanswered
  }/${props.numOfQuestions} unanswered`;
  const questionElements = props.questions.map((q) => {
    return (
      <Question
        key={q.qID}
        text={q.question}
        answers={q.answers}
        flipAnswer={props.flipAnswer}
        qID={q.qID}
        startGame={props.startGame}
        isAnswered={q.isAnswered}
      />
    );
  });

  return (
    <div className="question-page ">
      <button className="medium__btn back__btn" onClick={props.goBack}>
        back
      </button>
      <div className="questions-container slide-in-elliptic-top-fwd">
        {questionElements}
        <div className="check-answers">
          <h3 className="checkAnswers_description">
            {!props.startGame ? checkAnswerDes : ""}
          </h3>
          {!props.startGame ? (
            <button className="large__btn " onClick={props.retry}>
              play again
            </button>
          ) : (
            <button className="large__btn " onClick={props.checkAnswers}>
              Check Answers
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
