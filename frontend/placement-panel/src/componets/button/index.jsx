import "./style.css";
const Button = ({text,onclick,blue,disabled}) => {

  return (
<div disabled={disabled} className={blue ? "btn btn-blue " : "btn"} onClick={onclick}>{text}</div>
  );
};
export default Button;
