import {
  BinaryOperand,
  ProblemTemplate,
  UnaryOperand,
} from "./problem-template";

export interface UnaryProblem {
  type: UnaryOperand;
  operand: number;
  template: ProblemTemplate;
}

/** A binary problem. */
export interface BinaryProblem {
  /** The type of operation. */
  type: BinaryOperand;

  /** The first operand. */
  operand1: number;

  /** The second operand. */
  operand2: number;

  /** The template that generated tihs problem. */
  template: ProblemTemplate;
}

export type Problem = BinaryProblem | UnaryProblem;

export interface ProblemConstraints {
  minimumDifficulty: number;
  noDuplicate?: Problem;
}
