import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  return (
    <Box sx={{ width: "100%", backgroundColor: "#fff", margin: "5px" }}>
      <Typography sx={{ padding: "15px", fontWeight: "bold" }}>HH Timesheet</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginLeft: "20px", fontSize: "10px" }}>
        <Typography sx={{ cursor: "pointer", color: pathName === "/" ? "blue" : "#d3d3d3", borderBottom: pathName === "/" ? "2.5px solid blue" : "" }} onClick={() => navigate("/")}>
          Daftar Kegiatan
        </Typography>
        <Typography sx={{ cursor: "pointer", color: pathName === "/pengaturan" ? "blue" : "#d3d3d3", borderBottom: pathName === "/pengaturan" ? "2.5px solid blue" : "" }} onClick={() => navigate("/pengaturan")}>
          Pengaturan
        </Typography>
      </Box>
    </Box>
  );
}
