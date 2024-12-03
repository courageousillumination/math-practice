import React, { useState, useEffect, useCallback } from "react";
import { Box, Button, Input, Text, VStack, HStack } from "@chakra-ui/react";
import { Problem } from "@/types/problem";
import { Answer } from "@/types/answer";
import { solveProblem } from "@/logic/problem";

interface ProblemDisplayProps {
  /** Text to be displayed. */
  displayText: JSX.Element;

  /** The problem itself. */
  problem: Problem;

  /** Callback when the problem is done. */
  onSubmit: (answer: Answer) => void;
}

export const ProblemDisplay: React.FC<ProblemDisplayProps> = ({
  problem,
  onSubmit,
  displayText,
}) => {
  const [answer, setAnswer] = useState("");
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [hasAutoSubmitted, setHasAutosubmitted] = useState(false);

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
    setHasAutosubmitted(false);
  }, [problem]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handleNumberClick = (num: string) => {
    setAnswer((prev) => prev + num);
  };

  const handleSubmit = useCallback(() => {
    console.log();
    onSubmit({
      problem,
      answer: parseFloat(answer),
      timeTaken: (Date.now() - startTime) / 1000,
      correct: parseFloat(answer) === solveProblem(problem),
    });
  }, [answer, problem, startTime, onSubmit]);

  useEffect(() => {
    if (hasAutoSubmitted) return;
    const correctAnswer = solveProblem(problem);
    if (correctAnswer === parseFloat(answer)) {
      handleSubmit();
      setHasAutosubmitted(true);
    }
  }, [answer, problem, handleSubmit, hasAutoSubmitted]);

  const operationSymbol = problem.type === "addition" ? "+" : "*";

  return (
    <VStack align="center">
      <Box width="100%" display="flex" justifyContent={"space-between"}>
        {displayText}
        <Text fontSize="lg">{elapsedTime.toFixed(1)}s</Text>
      </Box>
      <HStack gap={2}>
        <Text fontSize="2xl">{problem.operand1}</Text>
        <Text fontSize="2xl">{operationSymbol}</Text>
        <Text fontSize="2xl">{problem.operand2}</Text>
      </HStack>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Input
          value={answer}
          onChange={handleInputChange}
          size="lg"
          textAlign="center"
          type="number"
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
        <Button width="100%" type="submit" colorScheme="teal" size="lg" mt={4}>
          Submit
        </Button>
      </form>
    </VStack>
  );
};
