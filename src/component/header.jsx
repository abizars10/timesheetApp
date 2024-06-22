import { Box, Typography } from "@mui/material";

export default function Header() {
  return (
    <header>
      <Box sx={{ display: "flex", backgroundColor: "#fff", color: "#F15858", paddingY: "5px", paddingLeft: "15px", margin: "5px" }}>
        <div className="container-fluid">
          <Typography sx={{ fontWeight: "bold", lineHeight: "10px" }}>
            <span style={{ fontSize: "14px" }}>Timesheet</span> <br />
            <span style={{ fontSize: "12px" }}>Management</span>
          </Typography>
        </div>
      </Box>
    </header>
  );
}
