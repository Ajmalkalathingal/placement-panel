import Button from '../button';
import './style.css'
const Input = ({labal,state,setState,placeholder,type}) => {
    
  return (
    <div className="input-wrapper">
      <p className="label-input">{labal}</p>
      <input
      className="custom-input"
        type={type}
        value={state}
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
};

export default Input