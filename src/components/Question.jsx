export default function Question(props) {
  const answersElements = props.answers.map((answer) => {
    const conditionObj = {
      selected: answer.isSelected && props.startGame ? "answer_selected" : "",
      wrong:
        answer.isSelected && !answer.isTrue && !props.startGame ? "wrong" : "",
      correct:
        answer.isTrue && props.isAnswered && !props.startGame ? "correct" : "",
      unanswered:
        !props.isAnswered && answer.isTrue && !props.startGame
          ? "unanswered"
          : "",
      disabled: !props.startGame && !answer.isTrue ? "disabled" : "",
    };

    return (
      <button
        className={`answer 
      ${conditionObj.selected}
       ${conditionObj.wrong}
        ${conditionObj.correct}
        ${conditionObj.unanswered}
        ${conditionObj.disabled}`}
        key={answer.anID}
        onClick={() => props.flipAnswer(answer.anID, props.qID)}
      >
        {answer.text}
      </button>
    );
  });

  return (
    <div className="question">
      <h3 className="question-title">{props.text}</h3>
      <div className="answers-container">{answersElements}</div>
    </div>
  );
}
