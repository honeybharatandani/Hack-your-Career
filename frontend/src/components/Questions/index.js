import React, { useState } from "react";
import data from "./data";
import SingleQuestion from "./Questions";
function Faq() {
  const [questions] = useState(data);

  return (
    <main>
      <div className="question__header">
        <h3>Frequently asked questions</h3>
        <section className="info">
          {questions.map(question => {
            return <SingleQuestion key={question.id} {...question} />;
          })}
        </section>
      </div>
    </main>
  );
}
export default Faq;
