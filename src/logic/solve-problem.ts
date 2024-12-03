import { Problem } from "@/types/problem";

/**
 * Solves a problem.
 */
export const solveProblem = (problem: Problem): number => {
  switch (problem.type) {
    case "addition":
      return problem.operand1 + problem.operand2;
    case "multiplication":
      return problem.operand1 * problem.operand2;
    default:
      throw new Error(`Unhandled problem type: ${problem.type}`);
  }
};
