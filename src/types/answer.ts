import { Problem } from "./problem";

export interface Answer {
  /** The problem this answer relates to. */
  problem: Problem;

  /** Time taken, in seconds. */
  timeTaken: number;

  /** The user's answer. */
  answer: number;

  /** Whether the answer is correct. */
  correct: boolean;
}
