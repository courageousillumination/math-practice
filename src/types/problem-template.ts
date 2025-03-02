export type UnaryOperand = "square" | "square-root";
export type BinaryOperand = "multiplication" | "addition";
export type Operand = UnaryOperand | BinaryOperand;
export interface ScaleRange {
  min: number;
  max: number;
}
export type Scale = number | ScaleRange;

/** A problem that involves only one operand. */
export interface UnaryProblemTemplate {
  /** The type of operation */
  type: UnaryOperand;

  /** The scale of the operation */
  scale: Scale;
}

/** A binary problem involves 2 operands. */
export interface BinaryProblemTemplate {
  type: BinaryOperand;

  /** Scale of the first operand. */
  scale1: Scale;

  /** Scale of the second operand. */
  scale2: Scale;
}

/**
 * A problem template defines a problem that can be generated.
 */
export type ProblemTemplate = BinaryProblemTemplate | UnaryProblemTemplate;
