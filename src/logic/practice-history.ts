import { SummarizedTrainingRoutineResults } from "@/types/training-routine-results";

const KEY = "history:v0";

/** Saves the results to the history. */
export const saveSummaryResults = (
  results: SummarizedTrainingRoutineResults
) => {
  // Do not save if we've already saved these before.
  const existing = loadSummaryResults();
  if (existing.find((x) => x.time === results.time)) return;
  localStorage.setItem(KEY, JSON.stringify([results, ...existing]));
};

/** Returns all history results. */
export const loadSummaryResults = (): SummarizedTrainingRoutineResults[] => {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
};

/** Remove an existing training result. */
export const removeSummaryResults = (
  results: SummarizedTrainingRoutineResults
) => {
  const existing = loadSummaryResults();
  localStorage.setItem(
    KEY,
    JSON.stringify(existing.filter((x) => x.time !== results.time))
  );
};
