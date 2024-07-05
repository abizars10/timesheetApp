import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function AppBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  return (
    <Box sx={{ background: "#fff", margin: "6px 3px ", padding: "5px", paddingLeft: "20px" }}>
      <Typography variant="h6" fontWeight={"bold"}>
        HH Timesheet
      </Typography>
      <Box display={"flex"} gap={2} marginLeft={2} marginTop={2}>
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
