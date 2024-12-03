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

  const handleSubmit = () => {
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
      <Input
        value={answer}
        onChange={handleInputChange}
        placeholder="Enter your answer"
        size="lg"
        textAlign="center"
      />
      <HStack spacing={2}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <Button key={num} onClick={() => handleNumberClick(num)} size="lg">
            {num}
          </Button>
        ))}
      </HStack>
      <Button onClick={handleSubmit} colorScheme="teal" size="lg">
        Submit
      </Button>
      <Text fontSize="lg">Time Elapsed: {elapsedTime}s</Text>
    </VStack>
  );
};
