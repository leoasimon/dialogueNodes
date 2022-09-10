import React, { useEffect, useState } from "react";

const question = {
  text: "Whats wrong with peanut butter jars?",
  answers: ["firstAnswer", "secondAnswer"],
};

const secondAnswer = {
  text: "I suck",
  nextNode: "answerToSecondAnswer",
};

const firstAnswer = {
  text: "They suck",
  nextNode: null,
};

const answerToSecondAnswer = {
  text: "No but really?",
  nextNode: "question",
};

const nodesDict = {
  question,
  firstAnswer,
  secondAnswer,
  answerToSecondAnswer,
};

export default function DialogueNode() {
  const [currentNode, setCurrenNode] = useState(question);
  const [text, setText] = useState(question.text);

  useEffect(() => {
    if (currentNode === null) {
      return;
    }
    setText(currentNode.text);
  }, [setText, currentNode]);

  const nextNode = (nodeName) => {
    setCurrenNode(nodesDict[nodeName]);
  };

  if (currentNode === null) {
    return <div>Game over</div>;
  }

  const answers =
    currentNode && currentNode.answers
      ? currentNode.answers.map((nodeName) => {
          const answer = nodesDict[nodeName];
          return answer;
        })
      : [];

  if (answers.length === 0) {
    setTimeout(() => {
      setCurrenNode(nodesDict[currentNode.nextNode]);
    }, 500);
  }

  return (
    <div>
      <h4>{text}</h4>
      {answers.map((answer) => {
        return (
          <button key={answer.text} onClick={() => nextNode(answer.nextNode)}>
            {answer.text}
          </button>
        );
      })}
    </div>
  );
}
