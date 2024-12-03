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
      operand1: 0,
      operand2: 0,
    };
  }
  throw new Error("Unknown problem type");
};
