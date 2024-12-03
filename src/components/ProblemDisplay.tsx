import { Problem } from "@/types/problem";

interface ProblemDisplayProps {
  /** The problem itself. */
  problem: Problem;

  /** Callback when the problem is done. */
  onSubmit: () => void;
}

export const ProblemDisplay: React.FC<ProblemDisplayProps> = ({ problem }) => {
  return null;
};
