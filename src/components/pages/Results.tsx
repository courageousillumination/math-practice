import { saveSummaryResults } from "@/logic/practice-history";
import { solveProblem } from "@/logic/problem";
import { summarizeResults } from "@/logic/summary";
import { TrainingRoutineResults } from "@/types/training-routine-results";
import { VStack, Text, Table } from "@chakra-ui/react";
import React, { useEffect, useMemo } from "react";
import { useLocation } from "react-router";
import { SummaryResultTable } from "../SummaryResultTable";

export const ResultsInternal: React.FC<{ results: TrainingRoutineResults }> = ({
  results,
}) => {
  const summaryResults = useMemo(() => summarizeResults(results), [results]);
  useEffect(() => {
    saveSummaryResults(summaryResults);
  }, [summaryResults]);

  return (
    <VStack gap={4} align="start">
      <Text fontSize="2xl">Summary Results</Text>
      <SummaryResultTable summaryResults={summaryResults} />
      <Text fontSize="2xl">Problem Results</Text>
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
          {results.answers.map((answer, index) => {
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

export const Results: React.FC = () => {
  const location = useLocation();
  return <ResultsInternal results={location.state.results} />;
};
