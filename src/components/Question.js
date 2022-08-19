import { cleanup } from "@testing-library/react";
import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(()=>{
    setTimeout(() => {
      setTimeRemaining(timeRemaining-1);
      runOutOfTime()
    }, 1000);
    return function cleanup() {
      clearTimeout()
    }
  })

  function runOutOfTime(){
   if (timeRemaining === 0){
     setTimeRemaining(10)
     onAnswered(false)
   }
  }
  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
