import { Problem } from "@/types/problem";
import { BinaryOperand, ProblemTemplate } from "@/types/problem-template";

const BINARY_OPERANDS: BinaryOperand[] = ["addition", "multiplication"];

/**
 * Generates a problem from a template.
 */
export const generateProblem = (template: ProblemTemplate): Problem => {
  if (BINARY_OPERANDS.includes(template.type)) {
    const min1 = Math.pow(10, template.scale1 - 1);
    const max1 = Math.pow(10, template.scale1) - 1;
    const operand1 = Math.floor(Math.random() * (max1 - min1 + 1)) + min1;

    const min2 = Math.pow(10, template.scale2 - 1);
    const max2 = Math.pow(10, template.scale2) - 1;
    const operand2 = Math.floor(Math.random() * (max2 - min2 + 1)) + min2;

    return {
      type: template.type,
      operand1,
      operand2,
    };
  }
  throw new Error("Unknown problem type");
};
