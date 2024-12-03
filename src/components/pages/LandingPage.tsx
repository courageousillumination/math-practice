import { Multiplication2x2Routine } from "@/data/routines";
import { TrainingRoutine } from "@/types/training-routine";
import { Button, Heading, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Routine } from "./Routine";

function LandingPage() {
  const [routine, setRoutine] = useState<TrainingRoutine | null>(null);

  if (routine) {
    return <Routine routine={routine} />;
  }

  return (
    <VStack justify="center" p={4}>
      <Heading as="h1" size="2xl" mb={8}>
        Math Training
      </Heading>
      <Heading size="lg" as="h2">
        Choose a routine
      </Heading>
      <VStack direction={["column", "row"]} gap={4}>
        <Button
          onClick={() => setRoutine(Multiplication2x2Routine)}
          colorScheme="teal"
          size="lg"
          width="100%"
        >
          2 x 2 Multiplication Training
        </Button>
      </VStack>
    </VStack>
  );
}

export default LandingPage;
