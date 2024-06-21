// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pengaturan from "./Pengaturan";
import DaftarKegiatan from "./DaftarKegiatan";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/pengaturan" element={<Pengaturan />} />
          <Route path="/" element={<DaftarKegiatan />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
