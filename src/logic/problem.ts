import { Problem, ProblemConstraints } from "@/types/problem";
import { BinaryOperand, ProblemTemplate } from "@/types/problem-template";

const BINARY_OPERANDS: BinaryOperand[] = ["addition", "multiplication"];

/** Generates a problem with a set of constraints */
export const generateProblemWithConstraints = (
  template: ProblemTemplate,
  constraints: ProblemConstraints = { minimumDifficulty: 0 }
): Problem => {
  let problem = generateProblem(template);

  let loopCount = 0;
  while (loopCount < 10 && !meetsConstraints(problem, constraints)) {
    problem = generateProblem(template);
    loopCount++;
  }

  if (loopCount == 10) {
    console.warn(
      "Could not generate a problem to meet constraints in a reasonable time."
    );
  }
  return problem;
};

/**
 * Generates a problem from a template.
 */
export const generateProblem = (template: ProblemTemplate): Problem => {
  if (BINARY_OPERANDS.includes(template.type)) {
    return {
      type: template.type,
      operand1: generateNumber(template.scale1),
      operand2: generateNumber(template.scale2),
      template,
    };
  }
  throw new Error("Unknown problem type");
};

/** Determines if two problems are equal. */
export const problemEqual = (a: Problem, b: Problem) => {
  return (
    a.type === b.type && a.operand1 === b.operand1 && a.operand2 == b.operand2
  );
};

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

/** Returns a unique ID for a problem. */
export const getProblemTypeId = (problem: ProblemTemplate): string => {
  return `${problem.scale1}x${problem.scale2} ${problem.type}`;
};

/** Generates a number at the given scale. */
const generateNumber = (scale: number) => {
  const min = Math.pow(10, scale - 1);
  const max = Math.pow(10, scale) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/** Determine the dificulty of a multiplication problem. */
const estimateMultiplicationDifficulty = (problem: Problem) => {
  const operands = [problem.operand1, problem.operand2];
  // Multiplication by any power of 10 should be easy, just count the 0s.
  if (operands.some((x) => Math.log10(x) % 1 == 0)) {
    return -1;
  }
  return 0;
};

/**
 * Tries to estimate how "difficult" a problem will be. Difficulties should
 * only be compared to problems of the same type. They create an ordering.
 * Difficulty can be negative meaning it's "easier" than an average problem.
 */
const estimateProblemDifficulty = (problem: Problem) => {
  switch (problem.type) {
    case "multiplication":
      return estimateMultiplicationDifficulty(problem);
    default:
      return 0;
  }
};

/** Determine if a problem meets all of the given constraints. */
const meetsConstraints = (
  problem: Problem,
  constraints: ProblemConstraints
) => {
  if (estimateProblemDifficulty(problem) < constraints.minimumDifficulty) {
    return false;
  }
  if (
    constraints.noDuplicate &&
    problemEqual(constraints.noDuplicate, problem)
  ) {
    return false;
  }
  return true;
};
