import React, { useState, useEffect } from "react";
import { Box, Button, Input, Text, VStack, HStack } from "@chakra-ui/react";
import { Problem } from "@/types/problem";
import { Answer } from "@/types/answer";

interface ProblemDisplayProps {
  /** The problem itself. */
  problem: Problem;

  /** Callback when the problem is done. */
  onSubmit: (answer: Answer) => void;
}

export const ProblemDisplay: React.FC<ProblemDisplayProps> = ({
  problem,
  onSubmit,
}) => {
  const [answer, setAnswer] = useState("");
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((Date.now() - startTime) / 1000);
    }, 100);

    return () => clearInterval(interval);
  }, [startTime]);

  useEffect(() => {
    setAnswer("");
    setStartTime(Date.now());
    setElapsedTime(0);
  }, [problem]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handleNumberClick = (num: string) => {
    setAnswer((prev) => prev + num);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      problem,
      answer: parseFloat(answer),
      timeTaken: (Date.now() - startTime) / 1000,
    });
  };

  const operationSymbol = problem.type === "addition" ? "+" : "*";

  return (
    <VStack gap={4} align="center">
      <Text fontSize="lg">Time Elapsed: {elapsedTime.toFixed(1)} seconds</Text>
      <HStack gap={2}>
        <Text fontSize="2xl">{problem.operand1}</Text>
        <Text fontSize="2xl">{operationSymbol}</Text>
        <Text fontSize="2xl">{problem.operand2}</Text>
      </HStack>
      <form onSubmit={handleSubmit}>
        <Input
          autoFocus
          value={answer}
          onChange={handleInputChange}
          placeholder="Enter your answer"
          size="lg"
          textAlign="center"
          mb={4}
        />
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "0", "Del"].map(
            (item) => (
              <Button
                key={item}
                onClick={() => {
                  if (item === "Del") {
                    setAnswer((prev) => prev.slice(0, -1));
                  } else {
                    handleNumberClick(item);
                  }
                }}
                size="lg"
              >
                {item}
              </Button>
            )
          )}
        </Box>
        <Button type="submit" colorScheme="teal" size="lg" mt={4}>
          Submit
        </Button>
      </form>
    </VStack>
  );
};
