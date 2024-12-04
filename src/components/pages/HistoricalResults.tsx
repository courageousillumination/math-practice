import React from "react";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import {
  loadSummaryResults,
  removeSummaryResults,
} from "@/logic/practice-history";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

              <DialogRoot>
                <DialogTrigger asChild>
                  <Button variant="ghost">Remove</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Delete</DialogTitle>
                  </DialogHeader>
                  <DialogBody>Are you sure?</DialogBody>
                  <DialogFooter>
                    <DialogActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogActionTrigger>
                    <Button
                      onClick={() => {
                        removeSummaryResults(x);
                        // Statee management is not worth it.
                        window.location.reload();
                      }}
                    >
                      Delete
                    </Button>
                  </DialogFooter>
                  <DialogCloseTrigger />
                </DialogContent>
              </DialogRoot>
            </Box>
            <SummaryResultTable summaryResults={x} />
          </Box>
        );
      })}
    </VStack>
  );
};
