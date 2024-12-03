import { ProblemTemplate } from "./problem-template";

/** A section of a routine. */
interface Section {
  /** The section name. */
  name?: string;

  /** The template that should be used for generating problems. */
  problemTemplate: ProblemTemplate;

  /** How many problems should be presented. */
  count: number;
}

/**
 * A training routine is a set of problems, which will be
 * completed in sequence.
 */
export interface TrainingRoutine {
  sections: Section[];
}
