import "./buttonstyle.css";

const Button = ({ text, onClick, blue, disabled }) => {
  return (
    <button
      className={blue ? "btn btn-blue" : "btn"}
      onClick={!disabled ? onClick : undefined} 
      disabled={disabled} 
    >
      {text}
    </button>
  );
};

export default Button;
