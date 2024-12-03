import { Provider } from "@/components/ui/provider";
import { Box, Container, Link as ChakraLink } from "@chakra-ui/react";
import LandingPage from "@/components/pages/LandingPage";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import { Routine } from "./components/pages/Routine";
import { Results } from "./components/pages/Results";
import { HistoricalResults } from "./components/pages/HistoricalResults";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Box display="flex" justifyContent={"space-between"} p={4}>
          <Box as="header" color="white">
            <ChakraLink asChild fontSize="xl" fontWeight="bold">
              <Link to="/">Math Trainer</Link>
            </ChakraLink>
          </Box>
          <ChakraLink asChild>
            <Link to="/history">History</Link>
          </ChakraLink>
        </Box>
        <Container centerContent>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/practice" element={<Routine />} />
            <Route path="/results" element={<Results />} />
            <Route path="/history" element={<HistoricalResults />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
