import { TrainingRoutine } from "@/types/training-routine";

export const Multiplication2x2Routine: TrainingRoutine = {
  sections: [
    {
      name: "Simple addition",
      problemTemplate: { type: "addition", scale1: 1, scale2: 1 },
      count: 1,
    },
    {
      name: "Simple multiplication",
      problemTemplate: { type: "multiplication", scale1: 1, scale2: 1 },
      count: 1,
    },
    {
      name: "Two digit addition",
      problemTemplate: { type: "addition", scale1: 2, scale2: 2 },
      count: 1,
    },
    {
      name: "2x1 Multiplication",
      problemTemplate: { type: "multiplication", scale1: 2, scale2: 1 },
      count: 1,
    },
    {
      name: "2x2 Multiplication",
      problemTemplate: { type: "multiplication", scale1: 2, scale2: 2 },
      count: 1,
    },
  ],
};
