import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "#features/dashboard/components/DashboardPage";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
