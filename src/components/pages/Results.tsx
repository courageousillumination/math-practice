import { solveProblem } from "@/logic/solve-problem";
import { Answer } from "@/types/answer";
import { VStack, Box, Text } from "@chakra-ui/react";

export const Results: React.FC<{ history: Answer[] }> = ({ history }) => {
  return (
    <VStack gap={4} align="start">
      <Text fontSize="2xl">History</Text>
      {history.map((answer, index) => (
        <Box key={index} p={4} shadow="md" borderWidth="1px">
          <Text>
            Problem: {answer.problem.operand1}{" "}
            {answer.problem.type === "addition" ? "+" : "*"}{" "}
            {answer.problem.operand2}
          </Text>
          <Text>Your Answer: {answer.answer}</Text>
          <Text>
            Correct:{" "}
            {answer.answer === solveProblem(answer.problem) ? "Yes" : "No"}
          </Text>
          <Text>Time Taken: {answer.timeTaken.toFixed(2)} seconds</Text>
        </Box>
      ))}
    </VStack>
  );
};
