import { BinaryOperand } from "./problem-template";

/** A binary problem. */
interface BinaryProblem {
  /** The type of operation. */
  type: BinaryOperand;

  /** The first operand. */
  operand1: number;

  /** The second operand. */
  operand2: number;
}

export type Problem = BinaryProblem;
