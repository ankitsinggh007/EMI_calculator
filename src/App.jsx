import React from "react";
import { ThemeProvider } from "./components/ThemeContext"; // Import the ThemeProvider
import EmiCalculator from "./components/EmiCalculator"; // Import your component

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <div className="border">
          <EmiCalculator />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
