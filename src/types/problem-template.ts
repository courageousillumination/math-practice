export type BinaryOperand = "multiplication" | "addition";

/** A binary problem involves 2 operands. */
interface BinaryProblemTemplate {
  type: BinaryOperand;

  /** Scale of the first operand. */
  scale1: number;

  /** Scale of the second operand. */
  scale2: number;
}

/**
 * A problem template defines a problem that can be generated.
 */
export type ProblemTemplate = BinaryProblemTemplate;
