import { Provider } from "@/components/ui/provider";
import { Box, Container, Link } from "@chakra-ui/react";
import LandingPage from "@/components/pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router";
import { Routine } from "./components/pages/Routine";
import { Results } from "./components/pages/Results";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Box as="header" color="white" p={4}>
          <Link href="/" fontSize="xl" fontWeight="bold">
            Math Trainer
          </Link>
        </Box>
        <Container>
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
