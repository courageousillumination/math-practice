import { Section, TrainingRoutine } from "@/types/training-routine";

type PartialSection = Omit<Section, "count">;

const Addition1x1: PartialSection = {
  name: "1x1 addition",
  problemTemplate: { type: "addition", scale1: 1, scale2: 1 },
};

const Addition2x2: PartialSection = {
  name: "2x2 addition",
  problemTemplate: { type: "addition", scale1: 2, scale2: 2 },
};

const Multiplication1x1: PartialSection = {
  name: "1x1 multiplication",
  problemTemplate: { type: "multiplication", scale1: 1, scale2: 1 },
};

const Multiplication2x1: PartialSection = {
  name: "2x1 Multiplication",
  problemTemplate: { type: "multiplication", scale1: 2, scale2: 1 },
};

const Multiplication2x2: PartialSection = {
  name: "2x2 Multiplication",
  problemTemplate: { type: "multiplication", scale1: 2, scale2: 2 },
};

const TwoDigitSquares: PartialSection = {
  name: "2 Digit Squares",
  problemTemplate: { type: "square", scale: 2 },
};

const SmallDivision: PartialSection = {
  name: "Division",
  problemTemplate: {
    type: "division",
    scale1: { min: 2, max: 3 },
    scale2: { min: 1, max: 2 },
  },
};

const SmallRoots: PartialSection = {
  name: "Small roots",
  problemTemplate: { type: "square-root", scale: { min: 2, max: 3 } },
};

export const SECTIONS = [
  Addition1x1,
  Addition2x2,
  Multiplication1x1,
  Multiplication2x1,
  Multiplication2x2,
  TwoDigitSquares,
  SmallRoots,
  SmallDivision,
];

export const Multiplication2x2Routine: TrainingRoutine = {
  sections: [
    { ...Addition1x1, count: 20 },
    { ...Multiplication1x1, count: 20 },
    { ...Addition2x2, count: 10 },
    { ...Multiplication2x1, count: 10 },
    { ...Multiplication2x2, count: 10 },
  ],
};

export const TwoDigitSquaresRoutine: TrainingRoutine = {
  sections: [
    { ...Multiplication2x1, count: 10 },
    { ...TwoDigitSquares, count: 10 },
  ],
};

export const SquareRouteRoutine: TrainingRoutine = {
  sections: [
    { ...TwoDigitSquares, count: 5 },
    { ...SmallDivision, count: 5 },
    { ...SmallRoots, count: 5 },
  ],
};

export const createRoutineFromPartialSection = (
  section: PartialSection,
  count: number = 10
): TrainingRoutine => {
  return {
    sections: [{ ...section, count }],
  };
};
