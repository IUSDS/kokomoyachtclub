import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ text, bg_color, text_color, navigate_to }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (navigate_to && (navigate_to.startsWith("http://") || navigate_to.startsWith("https://"))) {
      window.open(navigate_to, "_blank", "noopener,noreferrer");
    } else if (navigate_to) {
      navigate(`/${navigate_to}`);
    }
  };
  return (
    <div
      className={`px-10 py-4 rounded-full bg-${bg_color} text-${text_color} shadow-md hover:cursor-pointer hover:scale-105 hover:shadow-xl transform duration-300 w-fit`}
      onClick={handleClick}
    >
      {text}
    </div>
  );
};

export default Button;
