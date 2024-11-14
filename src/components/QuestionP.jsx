import React from "react";
import Question from "./Question";
export default function QuestionP(props) {
  console.log(props);

  const questionElements = props.questions.map((q) => {
    return <Question key={q.qID} text={q.question} answers={q.answers} />;
  });

  return (
    <div className="question-page">
      <div className="questions-container">{questionElements}</div>
    </div>
  );
}
