import { Answer } from "./answer";

export interface TrainingRoutineResults {
  /** A unique ID for this set of training routine results. */
  id: string;

  /** String representation of the time that this session started. */
  time: string;

  /** Answers given. */
  answers: Answer[];
}
