import { Button, Heading, VStack } from "@chakra-ui/react";

function LandingPage() {
  return (
    <VStack align="center" justify="center" minH="100vh" p={4}>
      <Heading as="h1" size="2xl" mb={8}>
        Math Training
      </Heading>
      <VStack direction={["column", "row"]} gap={4}>
        <Button colorScheme="teal" size="lg" width="100%">
          Quick Start
        </Button>
        <Button colorScheme="teal" size="lg" width="100%">
          Choose Routine
        </Button>
        <Button colorScheme="teal" size="lg" width="100%">
          Create Routine
        </Button>
      </VStack>
    </VStack>
  );
}

export default LandingPage;
