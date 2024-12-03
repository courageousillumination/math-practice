import { ProblemTemplate } from "./problem-template";

/**
 * A training routine is a set of problems, which will be
 * completed in sequence.
 */
export interface TrainingRoutine {
  problems: ProblemTemplate[];
}
