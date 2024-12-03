import { Provider } from "@/components/ui/provider";
import LandingPage from "@/components/pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router";
import { Routine } from "./components/pages/Routine";
import { Results } from "./components/pages/Results";

function App() {
  return (
    <Provider>
      <BrowserRouter>
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
