import React from "react";
import { FaRegCircle, FaTimes } from "react-icons/fa";
import { BsDash } from "react-icons/bs";

const Icon = ({ name }) => {
  switch (name) {
    case "circle":
      return <FaRegCircle className="icon" />;
    case "cross":
      return <FaTimes className="icon" />;
    case "dash":
      return <BsDash className="dash" />;
    default:
      return <div></div>;
  }
};

export default Icon;
