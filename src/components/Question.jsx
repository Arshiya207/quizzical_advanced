export default function Question(props) {
  const answersElements = props.answers.map((answer) => {
    return (
      <button className="answer" key={answer.anID}>
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
