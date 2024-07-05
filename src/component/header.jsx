import { Box, Typography } from "@mui/material";

export default function Header() {
  return (
    <Box sx={{ background: "#fff", margin: "2px", padding: "5px", paddingLeft: "20px" }}>
      <Typography color={"#F15858"} fontSize={"16px"} fontWeight={"bold"} lineHeight={1}>
        Timesheet
      </Typography>
      <Typography color={"#F15858"} fontSize={"14px"} fontWeight={"bold"}>
        Management
      </Typography>
    </Box>
  );
}
