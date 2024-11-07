import React from "react";
export default function CreateQP() {
  const [input, setInputs] = React.useState({});
  const [categories, setCategories] = React.useState();

  React.useEffect(() => {
    async function fetchCate() {
      const res = await fetch("https://opentdb.com/api_category.php");
      const data = await res.json();
      setCategories(data.trivia_categories);
    }
    fetchCate();
  }, []);
let categoriesElements="loading"

 if(categories){
   categoriesElements = categories.map((category) => (
    <option key={category.id} value={category.name}>
      {category.name}
    </option>
  ));
 }
 
  return (
    <div className="create-quiz-container">
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
          <input type="text" name="amount" id="amount" className="QP__input"/>
        </div>
        <div>
          <label htmlFor="difficulty">select difficulty: </label>
          <select name="difficulty" id="difficulty" className="QP__input">
            <option value="random" >random</option>
            <option value="easy">easy</option>
            <option value="hard">hard</option>
            <option value="very hard">very hard</option>
          </select>
        </div>
        <div>
            <label htmlFor="type">select type: </label>
          <select name="type" id="type" className="QP__input">
            <option value="random" >random</option>
            <option value="multiple">multiple</option>
            <option value="true / false">true / false</option>
          </select>
        </div>
        <div>
            <label htmlFor="category">select category: </label>
          <select name="category" id="category"  className="QP__input">
            {!categories? <option>{categoriesElements}</option>: categoriesElements }
          </select>
        </div>
      </div>
      <div className="createQuiz__navigation">
        <button className="medium__btn back__btn">back</button>
        <button className="medium__btn start__btn">let's do this</button>
      </div>
    </div>
  );
}
