import {
  SectionSummary,
  SummarizedTrainingRoutineResults,
  TrainingRoutineResults,
} from "@/types/training-routine-results";
import { getProblemTypeId } from "./problem";
import { Answer } from "@/types/answer";

export const summarizeResults = (
  results: TrainingRoutineResults
): SummarizedTrainingRoutineResults => {
  const answerGroups: Record<string, Answer[]> = {};
  const summaries: Record<string, SectionSummary> = {};
  for (const answer of results.answers) {
    const key = getProblemTypeId(answer.problem.template);
    answerGroups[key] = [...(answerGroups[key] || []), answer];
  }

  for (const key of Object.keys(answerGroups)) {
    const answers = answerGroups[key];
    const averageTime =
      answers.reduce((acc, a) => acc + a.timeTaken, 0) / answers.length;
    const accuracy =
      answers.reduce((acc, a) => acc + (a.correct ? 1 : 0), 0) / answers.length;
    summaries[key] = {
      problemTypeId: key,
      averageTime,
      accuracy,
      problemCount: answers.length,
    };
  }
  return {
    time: results.time,
    summaries,
  };
};
