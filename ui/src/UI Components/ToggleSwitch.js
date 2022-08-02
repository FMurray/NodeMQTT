import React from "react";
import "./toggle.css";
const Switch = ({ isOn, handleToggle,onColor,item }) => {
  return (
    <><span className="buttonName">{item}
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={item}
        type="checkbox"
      />
     
      <label 
      style={{backgroundColor: isOn && onColor }}
      className="react-switch-label" 
      htmlFor={item} >
      <span className={"react-switch-button"} />
      </label>
      </span>
    </>
  );
};

export default Switch;
