export default function StartP(props){
    return (
        <div className="start-container slide-in-elliptic-top-fwd">
            <h1 className="start__title">Quizzical</h1>
            <p className="start__description">let's take a quiz and test your knowledge</p>
            <button className="large__btn" onClick={props.goForward}>Start Quiz</button>
        </div>
    )
}