import {
  createRoutineFromPartialSection,
  Multiplication2x2Routine,
  SECTIONS,
} from "@/data/routines";
import {
  SelectRoot,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import {
  Button,
  createListCollection,
  Heading,
  VStack,
} from "@chakra-ui/react";

import { useNavigate } from "react-router";

const SECTIONS_COLLECTION = createListCollection({
  items: SECTIONS.map((x, i) => ({ label: x.name, value: i })),
});

function LandingPage() {
  const navigate = useNavigate();

  return (
    <VStack justify="center" p={4}>
      <Heading size="lg" as="h2">
        Choose a full routine
      </Heading>
      <VStack direction={["column", "row"]} gap={4}>
        <Button
          onClick={() =>
            navigate("/practice", {
              state: { routine: Multiplication2x2Routine },
            })
          }
          colorScheme="teal"
          size="lg"
          width="100%"
        >
          2 x 2 Multiplication Training
        </Button>
      </VStack>
      <Heading size="lg" as="h2">
        Choose a small routine
      </Heading>
      <SelectRoot
        maxWidth={"400px"}
        onValueChange={({ value }) => {
          navigate("/practice", {
            state: {
              routine: createRoutineFromPartialSection(
                SECTIONS[parseInt(value[0])]
              ),
            },
          });
        }}
        collection={SECTIONS_COLLECTION}
      >
        <SelectLabel>Select framework</SelectLabel>
        <SelectTrigger>
          <SelectValueText placeholder="Select problem set" />
        </SelectTrigger>
        <SelectContent>
          {SECTIONS_COLLECTION.items.map((movie) => (
            <SelectItem item={movie} key={movie.value}>
              {movie.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </VStack>
  );
}

export default LandingPage;
