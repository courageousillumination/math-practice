import { Problem } from "@/types/problem";
import { BinaryOperand, ProblemTemplate } from "@/types/problem-template";

const BINARY_OPERANDS: BinaryOperand[] = ["addition", "multiplication"];

/**
 * Generates a problem from a template.
 */
export const generateProblem = (template: ProblemTemplate): Problem => {
  if (BINARY_OPERANDS.includes(template.type)) {
    return {
      type: template.type,
      operand1: generateNumber(template.scale1),
      operand2: generateNumber(template.scale2),
    };
  }
  throw new Error("Unknown problem type");
};

/** Generates a number at the given scale. */
const generateNumber = (scale: number) => {
  const min = Math.pow(10, scale - 1);
  const max = Math.pow(10, scale) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
