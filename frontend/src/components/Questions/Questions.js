import React, { useState } from "react";
import "./Questions.css";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
const Question = ({ title, info }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <article className="question">
      <header>
        <h4>{title}</h4>
        {/* {showInfo ? <AiOutlineMinus onClick={() => setShowInfo(true)} /> : <AiOutlinePlus />} */}
        <button onClick={() => setShowInfo(!showInfo)} className="quesbtn">
          {showInfo ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </header>
      {/* {showInfo ? <p>{info}</p> : <p></p>} */}
      {showInfo && <p>{info}</p>}
    </article>
  );
};

export default Question;
