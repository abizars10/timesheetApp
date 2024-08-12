// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pengaturan from "./Pengaturan";
import DaftarKegiatan from "./DaftarKegiatan";
import Header from "./component/Header";
import AppBar from "./component/AppBar";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <AppBar />
        <Routes>
          <Route path="/pengaturan" element={<Pengaturan />} />
          <Route path="/" element={<DaftarKegiatan />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
