import React, { useState, useEffect } from "react";
import { Box, Button, Input, Text, VStack, HStack } from "@chakra-ui/react";
import { Problem } from "@/types/problem";

interface ProblemDisplayProps {
  /** The problem itself. */
  problem: Problem;

  /** Callback when the problem is done. */
  onSubmit: () => void;
}

export const ProblemDisplay: React.FC<ProblemDisplayProps> = ({ problem, onSubmit }) => {
  const [answer, setAnswer] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    setIntervalId(id);

    return () => {
      if (id) clearInterval(id);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handleNumberClick = (num: number) => {
    setAnswer((prev) => prev + num.toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (intervalId) clearInterval(intervalId);
    onSubmit();
  };

  const operationSymbol = problem.type === "addition" ? "+" : "*";

  return (
    <VStack spacing={4} align="center">
      <HStack spacing={2}>
        <Text fontSize="2xl">{problem.operand1}</Text>
        <Text fontSize="2xl">{operationSymbol}</Text>
        <Text fontSize="2xl">{problem.operand2}</Text>
      </HStack>
      <form onSubmit={handleSubmit}>
        <Input
          value={answer}
          onChange={handleInputChange}
          placeholder="Enter your answer"
          size="lg"
          textAlign="center"
          mb={4}
        />
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "0", "Del"].map((item) => (
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
          ))}
        </Box>
        <Button type="submit" colorScheme="teal" size="lg" mt={4}>
          Submit
        </Button>
      </form>
      <Text fontSize="lg">Time Elapsed: {elapsedTime}s</Text>
    </VStack>
  );
};
