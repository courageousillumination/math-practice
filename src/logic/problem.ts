import {
  BinaryProblem,
  Problem,
  ProblemConstraints,
  UnaryProblem,
} from "@/types/problem";
import {
  BinaryProblemTemplate,
  Operand,
  ProblemTemplate,
  Scale,
  UnaryProblemTemplate,
} from "@/types/problem-template";

// Operands that can result in a decimal part
const DECMIAL_OPERANDS: Operand[] = ["square-root", "division"];
const BINARY_OPERANDS: Operand[] = ["addition", "multiplication", "division"];
const UNARY_OPERANDS: Operand[] = ["square", "square-root"];

const isUnaryProblem = (p: Problem): p is UnaryProblem => {
  return UNARY_OPERANDS.includes(p.type);
};

const isBinaryProblem = (p: Problem): p is BinaryProblem => {
  return BINARY_OPERANDS.includes(p.type);
};

const isUnaryTemplate = (p: ProblemTemplate): p is UnaryProblemTemplate => {
  return UNARY_OPERANDS.includes(p.type);
};

const isBinaryTemplate = (p: ProblemTemplate): p is BinaryProblemTemplate => {
  return BINARY_OPERANDS.includes(p.type);
};

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
  if (isUnaryTemplate(template)) {
    return {
      type: template.type,
      operand: generateNumber(template.scale),
      template,
    } as UnaryProblem;
  }
  if (isBinaryTemplate(template)) {
    return {
      type: template.type,
      operand1: generateNumber(template.scale1),
      operand2: generateNumber(template.scale2),
      template,
    } as BinaryProblem;
  }
  throw new Error("Unknown problem type");
};

/** Determines if two problems are equal. */
export const problemEqual = (a: Problem, b: Problem) => {
  if (a.type !== b.type) {
    return false;
  }

  if (isUnaryProblem(a) && isUnaryProblem(b)) {
    return a.operand == b.operand;
  }

  if (isBinaryProblem(a) && isBinaryProblem(b)) {
    return a.operand1 === b.operand1 && a.operand2 == b.operand2;
  }
  return false;
};

const getFixedValue = (num: number): number => {
  return Math.trunc(num * 10) / 10;
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
    case "square":
      return problem.operand * problem.operand;
    case "square-root":
      return getFixedValue(Math.sqrt(problem.operand));
    case "division":
      return getFixedValue(problem.operand1 / problem.operand2);
    default:
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw new Error(`Unhandled problem type: ${(problem as any).type}`);
  }
};

/** Returns a unique ID for a problem. */
export const getProblemTypeId = (problem: ProblemTemplate): string => {
  if (isBinaryTemplate(problem)) {
    return `${problem.scale1}x${problem.scale2} ${problem.type}`;
  } else {
    return `${problem.scale}`;
  }
};

/** Generates a number at the given scale. */
const generateNumber = (scale: Scale) => {
  let realScale: number;
  if (typeof scale == "number") {
    realScale = scale;
  } else {
    realScale =
      Math.floor(Math.random() * (scale.max - scale.min + 1)) + scale.min;
  }
  const min = Math.pow(10, realScale - 1);
  const max = Math.pow(10, realScale) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/** Determine the dificulty of a multiplication problem. */
const estimateMultiplicationDifficulty = (problem: BinaryProblem) => {
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

export const problemToString = (problem: Problem): string => {
  switch (problem.type) {
    case "addition":
      return `${problem.operand1} + ${problem.operand2}`;
    case "multiplication":
      return `${problem.operand1} * ${problem.operand2}`;
    case "square":
      return `${problem.operand}^2`;
    case "square-root":
      return `√${problem.operand}`;
    case "division":
      return `${problem.operand1} / ${problem.operand2}`;
  }
};

export const suppotsAutoSubmit = (type: Operand): boolean => {
  // Don't allow auto submit on decimal operands because we want you to put in the .0 if necessary
  // (in case you're still computing we don't want to cheat here).
  return !DECMIAL_OPERANDS.includes(type);
};
