export default function DarkModeBtn(props) {
  return (
    <div className="dark-mode-wrapper" onClick={props.toggleDarkMode}>
      <span className={`bi  bi-moon-stars-fill dark-mode__icon`}></span>
    </div>
  );
}
