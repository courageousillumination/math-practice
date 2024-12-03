import { generateProblem, problemEqual } from "@/logic/problem";
import { Answer } from "@/types/answer";
import { Problem } from "@/types/problem";
import { TrainingRoutine } from "@/types/training-routine";
import { useEffect, useState } from "react";
import { ProblemDisplay } from "../ProblemDisplay";
import { useLocation, useNavigate } from "react-router";
import { VStack, Heading, Text } from "@chakra-ui/react";
import { TrainingRoutineResults } from "@/types/training-routine-results";

interface RoutineProgress {
  sectionIdx: number;
  problemIdx: number;
}

/** Is the routine done? */
const isDone = (routine: TrainingRoutine, progress: RoutineProgress) => {
  return progress.sectionIdx >= routine.sections.length;
};

/** Move to the next problem. */
const nextProblem = (routine: TrainingRoutine, progress: RoutineProgress) => {
  if (isDone(routine, progress)) {
    return progress;
  }
  if (progress.problemIdx + 1 < routine.sections[progress.sectionIdx].count) {
    return { ...progress, problemIdx: progress.problemIdx + 1 };
  } else {
    return { sectionIdx: progress.sectionIdx + 1, problemIdx: 0 };
  }
};

/** Display for a full practice routine. */
export const RoutineInternal: React.FC<{ routine: TrainingRoutine }> = ({
  routine,
}) => {
  const [progress, setProgress] = useState<RoutineProgress>({
    sectionIdx: 0,
    problemIdx: 0,
  });
  const [problem, setProblem] = useState<Problem | null>(null);
  const [history, setHistory] = useState<Answer[]>([]);
  const navigate = useNavigate();

  const onSubmit = (answer: Answer) => {
    setHistory((x) => [...x, answer]);
    const next = nextProblem(routine, progress);
    setProgress(next);
  };

  useEffect(() => {
    if (!isDone(routine, progress)) {
      setProblem((x) => {
        // Prevent duplicates. There is a way to do this determinstically, but
        // I'm not going to bother right now. To prevent a possible infinite loop
        // we'll just do this once.
        let newProblem = generateProblem(
          routine.sections[progress.sectionIdx].problemTemplate
        );
        if (x !== null && problemEqual(newProblem, x)) {
          newProblem = generateProblem(
            routine.sections[progress.sectionIdx].problemTemplate
          );
        }
        return newProblem;
      });
    } else {
      navigate("/results", {
        state: {
          results: {
            answers: history,
            time: new Date().toISOString(),
          } as TrainingRoutineResults,
        },
      });
    }
  }, [progress, routine, history, navigate]);

  const currentSection = routine.sections[progress.sectionIdx];
  if (problem === null || !currentSection) return null;

  return (
    <VStack>
      <Heading>
        {currentSection.name || `Section ${progress.sectionIdx + 1}`} (
        {progress.sectionIdx + 1} / {routine.sections.length})
      </Heading>

      <ProblemDisplay
        displayText={
          <Text>
            {progress.problemIdx + 1} / {currentSection.count}
          </Text>
        }
        problem={problem}
        onSubmit={onSubmit}
      />
    </VStack>
  );
};

/** Location based routine. */
export const Routine = () => {
  const location = useLocation();
  return <RoutineInternal routine={location.state.routine} />;
};
