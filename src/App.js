import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
function App() {
  return (
    <div className="App">
      <h1>My Plant management</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plant/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
