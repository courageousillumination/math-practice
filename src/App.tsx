import { Provider } from "@/components/ui/provider";
import { Box, Container, Link as ChakraLink } from "@chakra-ui/react";
import LandingPage from "@/components/pages/LandingPage";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import { Routine } from "./components/pages/Routine";
import { Results } from "./components/pages/Results";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Box as="header" color="white" p={4}>
          <ChakraLink asChild fontSize="xl" fontWeight="bold">
            <Link to="/">Math Trainer</Link>
          </ChakraLink>
        </Box>
        <Container centerContent>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/practice" element={<Routine />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
