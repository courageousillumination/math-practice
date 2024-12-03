import React from "react";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import {
  loadSummaryResults,
  removeSummaryResults,
} from "@/logic/practice-history";
import { SummaryResultTable } from "../SummaryResultTable";

export const HistoricalResults: React.FC = () => {
  const data = loadSummaryResults();
  return (
    <VStack gap={4} align="start">
      {data.map((x) => {
        return (
          <Box width="100%">
            <Box
              display="flex"
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Heading>{x.time}</Heading>
              <Button
                variant="ghost"
                onClick={() => {
                  removeSummaryResults(x);
                  // Statee management is not worth it.
                  window.location.reload();
                }}
              >
                Remove
              </Button>
            </Box>
            <SummaryResultTable summaryResults={x} />
          </Box>
        );
      })}
    </VStack>
  );
};
