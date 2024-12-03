import { solveProblem } from "@/logic/solve-problem";
import { Answer } from "@/types/answer";
import { VStack, Text, Table } from "@chakra-ui/react";

export const Results: React.FC<{ history: Answer[] }> = ({ history }) => {
  return (
    <VStack gap={4} align="start">
      <Text fontSize="2xl">History</Text>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Problem</Table.ColumnHeader>
            <Table.ColumnHeader>Your Answer</Table.ColumnHeader>
            <Table.ColumnHeader>Correct</Table.ColumnHeader>
            <Table.ColumnHeader>Correct Answer</Table.ColumnHeader>
            <Table.ColumnHeader>Time Taken (s)</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {history.map((answer, index) => {
            const correctAnswer = solveProblem(answer.problem);
            const isCorrect = answer.answer === correctAnswer;
            return (
              <Table.Row key={index}>
                <Table.Cell>
                  {answer.problem.operand1}{" "}
                  {answer.problem.type === "addition" ? "+" : "*"}{" "}
                  {answer.problem.operand2}
                </Table.Cell>
                <Table.Cell>{answer.answer}</Table.Cell>
                <Table.Cell>{isCorrect ? "Yes" : "No"}</Table.Cell>
                <Table.Cell>{isCorrect ? "-" : correctAnswer}</Table.Cell>
                <Table.Cell>{answer.timeTaken.toFixed(2)}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </VStack>
  );
};
