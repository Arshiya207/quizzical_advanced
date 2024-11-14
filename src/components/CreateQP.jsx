import React from "react";
export default function CreateQP(props) {
  const [inputs, setInputs] = React.useState({
    amount: "1",
    difficulty: "",
    type: "",
    category: "9",
  });
  const [categories, setCategories] = React.useState();
  // event handlers
  function inputChange(e) {
    const { value, name } = e.target;

    setInputs((preInputs) => {
      return { ...preInputs, [name]: value };
    });
  }

  //end event handlers

  // use effects
  React.useEffect(() => {
    async function fetchCate() {
      const res = await fetch("https://opentdb.com/api_category.php");
      const data = await res.json();
      setCategories(data.trivia_categories);
    }
    fetchCate();
  }, []);
  // end use effects
  let categoriesElements = "loading";

  if (categories) {
    categoriesElements = categories.map((category) => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ));
  }

  return (
    <div className="create-quiz-container slide-in-elliptic-top-fwd">
      <div className="createQuiz__information">
        <h2 className="QP-information__title">Create a Quiz</h2>
        <p className="QP-information__description">
          Choose the difficulty level, numbers of questions and category of
          questions you would like the quiz to be created.
        </p>
      </div>
      <div className="createQuiz__inputs">
        <div>
          <label htmlFor="amount">number of Questions: </label>
          <input
            type="number"
            min="1"
            max="50"
            name="amount"
            id="amount"
            value={inputs.amount}
            onChange={inputChange}
            className="QP__input"
          />
        </div>
        <div>
          <label htmlFor="difficulty">select difficulty: </label>
          <select
            name="difficulty"
            value={inputs.difficulty}
            onChange={inputChange}
            id="difficulty"
            className="QP__input"
          >
            <option value="">random</option>
            <option value="easy">easy</option>
            <option value="medium">hard</option>
            <option value="hard">very hard</option>
          </select>
        </div>
        <div>
          <label htmlFor="type">select type: </label>
          <select
            name="type"
            id="type"
            value={inputs.type}
            onChange={inputChange}
            className="QP__input"
          >
            <option value="">random</option>
            <option value="multiple">multiple</option>
            <option value="boolean">true / false</option>
          </select>
        </div>
        <div>
          <label htmlFor="category">select category: </label>
          <select
            name="category"
            id="category"
            value={inputs.category}
            onChange={inputChange}
            className="QP__input"
          >
            {!categories ? (
              <option>{categoriesElements}</option>
            ) : (
              categoriesElements
            )}
          </select>
        </div>
      </div>
      <div className="createQuiz__navigation">
        <button className="medium__btn back__btn" onClick={props.goBack}>
          back
        </button>
        <button
          className="medium__btn start__btn"
          onClick={() => props.startG(inputs)}
        >
          let's do this
        </button>
      </div>
    </div>
  );
}
