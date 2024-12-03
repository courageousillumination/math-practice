import { Answer } from "./answer";

export interface TrainingRoutineResults {
  /** String representation of the time that this session ended (used for an ID). */
  time: string;

  /** Answers given. */
  answers: Answer[];
}

export interface SectionSummary {
  /** A unique ID for this type of problem. */
  problemTypeId: string;

  /** Average time taken. */
  averageTime: number;

  /** Percentage of answers that were correct (0.0 - 1.0) */
  accuracy: number;

  /** The number of problems solved. */
  problemCount: number;
}

export interface SummarizedTrainingRoutineResults {
  /** String representation of the time that this session ended (used for an ID). */
  time: string;

  /** Summaries for eaach section. */
  summaries: Record<string, SectionSummary>;
}
