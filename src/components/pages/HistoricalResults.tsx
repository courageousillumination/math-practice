import React from "react";
import { VStack, Text, Table } from "@chakra-ui/react";

export const HistoricalResults: React.FC = () => {
  const results = JSON.parse(localStorage.getItem("results") || "[]");

  return (
    <VStack gap={4} align="start">
      <Text fontSize="2xl">Historical Results</Text>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Date</Table.ColumnHeader>
            <Table.ColumnHeader>Problem</Table.ColumnHeader>
            <Table.ColumnHeader>Your Answer</Table.ColumnHeader>
            <Table.ColumnHeader>Correct</Table.ColumnHeader>
            <Table.ColumnHeader>Correct Answer</Table.ColumnHeader>
            <Table.ColumnHeader>Time Taken (s)</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {results.map((result: any, resultIndex: number) =>
            result.answers.map((answer: any, index: number) => {
              const correctAnswer = answer.problem.correctAnswer;
              const isCorrect = answer.answer === correctAnswer;
              return (
                <Table.Row key={`${resultIndex}-${index}`}>
                  <Table.Cell>{new Date(result.time).toLocaleString()}</Table.Cell>
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
            })
          )}
        </Table.Body>
      </Table.Root>
    </VStack>
  );
};
