import { solveProblem } from "@/logic/solve-problem";
import { Answer } from "@/types/answer";
import { VStack, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

export const Results: React.FC<{ history: Answer[] }> = ({ history }) => {
  return (
    <VStack gap={4} align="start">
      <Text fontSize="2xl">History</Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Problem</Th>
            <Th>Your Answer</Th>
            <Th>Correct</Th>
            <Th>Correct Answer</Th>
            <Th>Time Taken (s)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {history.map((answer, index) => {
            const correctAnswer = solveProblem(answer.problem);
            const isCorrect = answer.answer === correctAnswer;
            return (
              <Tr key={index}>
                <Td>
                  {answer.problem.operand1}{" "}
                  {answer.problem.type === "addition" ? "+" : "*"}{" "}
                  {answer.problem.operand2}
                </Td>
                <Td>{answer.answer}</Td>
                <Td>{isCorrect ? "Yes" : "No"}</Td>
                <Td>{isCorrect ? "-" : correctAnswer}</Td>
                <Td>{answer.timeTaken.toFixed(2)}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </VStack>
  );
};
