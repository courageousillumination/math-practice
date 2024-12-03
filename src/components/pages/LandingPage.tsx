import { Button, Heading, VStack } from "@chakra-ui/react";

function LandingPage() {
  return (
    <VStack align="center" justify="center" minH="100vh" p={4}>
      <Heading as="h1" size="2xl" mb={8}>
        Math Training
      </Heading>
      <Button colorScheme="teal" size="lg" width="100%" mb={8}>
        Quick Start
      </Button>
      <VStack direction={["column", "row"]} gap={4}>
        <Button colorScheme="teal" size="lg" width="100%">
          Addition
        </Button>
        <Button colorScheme="teal" size="lg" width="100%">
          Multiplication
        </Button>
        <Button colorScheme="teal" size="lg" width="100%">
          Placeholder
        </Button>
      </VStack>
    </VStack>
  );
}

export default LandingPage;
