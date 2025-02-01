export type UnaryOperand = "square";
export type BinaryOperand = "multiplication" | "addition";
export type Operand = UnaryOperand | BinaryOperand;

/** A problem that involves only one operand. */
export interface UnaryProblemTemplate {
  /** The type of operation */
  type: UnaryOperand;

  /** The scale of the operation */
  scale: number;
}

/** A binary problem involves 2 operands. */
export interface BinaryProblemTemplate {
  type: BinaryOperand;

  /** Scale of the first operand. */
  scale1: number;

  /** Scale of the second operand. */
  scale2: number;
}

/**
 * A problem template defines a problem that can be generated.
 */
export type ProblemTemplate = BinaryProblemTemplate | UnaryProblemTemplate;
