import React, { useState, useEffect } from "react";
import { Problem } from "@/types/problem";

interface ProblemDisplayProps {
  /** The problem itself. */
  problem: Problem;

  /** Callback when the problem is done. */
  onSubmit: () => void;
}

export const ProblemDisplay: React.FC<ProblemDisplayProps> = ({ problem, onSubmit }) => {
  const [answer, setAnswer] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    setIntervalId(id);

    return () => {
      if (id) clearInterval(id);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handleNumberClick = (num: number) => {
    setAnswer((prev) => prev + num.toString());
  };

  const handleSubmit = () => {
    if (intervalId) clearInterval(intervalId);
    onSubmit();
  };

  const operationSymbol = problem.type === "addition" ? "+" : "*";

  return (
    <div>
      <div>
        <span>{problem.operand1}</span>
        <span> {operationSymbol} </span>
        <span>{problem.operand2}</span>
      </div>
      <div>
        <input type="text" value={answer} onChange={handleInputChange} />
      </div>
      <div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button key={num} onClick={() => handleNumberClick(num)}>
            {num}
          </button>
        ))}
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>Time Elapsed: {elapsedTime}s</div>
    </div>
  );
};
