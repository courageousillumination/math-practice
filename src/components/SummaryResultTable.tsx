import { SummarizedTrainingRoutineResults } from "@/types/training-routine-results";
import { Table } from "@chakra-ui/react";

export const SummaryResultTable: React.FC<{
  summaryResults: SummarizedTrainingRoutineResults;
}> = ({ summaryResults }) => {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Problem Type</Table.ColumnHeader>
          <Table.ColumnHeader>Accuraacy</Table.ColumnHeader>
          <Table.ColumnHeader>Average Time</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Object.values(summaryResults.summaries).map((summary) => {
          return (
            <Table.Row key={summary.problemTypeId}>
              <Table.Cell>{summary.problemTypeId}</Table.Cell>
              <Table.Cell>{(summary.accuracy * 100).toFixed(0)}%</Table.Cell>
              <Table.Cell>{summary.averageTime.toFixed(2)}s</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};
