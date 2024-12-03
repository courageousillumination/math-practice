import { Box, Button, Heading, Stack, VStack } from "@chakra-ui/react";

function LandingPage() {
  return (
    <VStack spacing={8} align="center" justify="center" minH="100vh" p={4}>
      <Heading as="h1" size="2xl" mb={8}>
        Math Training
      </Heading>
      <Stack direction={["column", "row"]} spacing={4}>
        <Button colorScheme="teal" size="lg">
          Quick Start
        </Button>
        <Button colorScheme="teal" size="lg">
          Choose Routine
        </Button>
        <Button colorScheme="teal" size="lg">
          Create Routine
        </Button>
      </Stack>
    </VStack>
  );
}

export default LandingPage;
