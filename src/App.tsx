import { Provider } from "@/components/ui/provider";
import { Box, Link } from "@chakra-ui/react";
import LandingPage from "@/components/pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router";
import { Routine } from "./components/pages/Routine";
import { Results } from "./components/pages/Results";

function App() {
  return (
    <Provider>
      <Box as="header" bg="teal.500" color="white" p={4}>
        <Link href="/" fontSize="xl" fontWeight="bold">
          Math Trainer
        </Link>
      </Box>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/practice" element={<Routine />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
