import { BinaryOperand, ProblemTemplate } from "./problem-template";

/** A binary problem. */
interface BinaryProblem {
  /** The type of operation. */
  type: BinaryOperand;

  /** The first operand. */
  operand1: number;

  /** The second operand. */
  operand2: number;

  /** The template that generated tihs problem. */
  template: ProblemTemplate;
}

export type Problem = BinaryProblem;
