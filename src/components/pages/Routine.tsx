import { generateProblem } from "@/logic/generate-problem";
import { Answer } from "@/types/answer";
import { Problem } from "@/types/problem";
import { TrainingRoutine } from "@/types/training-routine";
import { useEffect, useState } from "react";
import { ProblemDisplay } from "../ProblemDisplay";

/**
 * Display for a full practice routine.
 */
export const Routine: React.FC<{ routine: TrainingRoutine }> = ({
  routine,
}) => {
  const [currentProblemIdx, setCurrentProblemIdx] = useState(0);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [history, setHistory] = useState<Answer[]>([]);

  // Generate a new problem whenever the problem id changes.
  useEffect(() => {
    if (currentProblemIdx < routine.problems.length) {
      setProblem(generateProblem(routine.problems[currentProblemIdx]));
    }
  }, [routine, currentProblemIdx]);

  const onSubmit = (answer: Answer) => {
    setHistory((x) => [...x, answer]);
    setCurrentProblemIdx((x) => x + 1);
  };

  if (currentProblemIdx < routine.problems.length) {
    if (problem === null) return null;
    return <ProblemDisplay problem={problem} onSubmit={onSubmit} />;
  } else {
    return null;
  }
};
