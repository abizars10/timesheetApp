import { Box, Button, Card, InputAdornment, TextField, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function Pengaturan() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/");
  };
  return (
    <Card variant="outlined" sx={{ width: "25vw", height: "30%", margin: "50px auto", padding: 5, display: "flex", flexDirection: "column", gap: 2 }}>
      <Box>
        <Typography sx={{ fontSize: "16px" }}>Nama Karyawan</Typography>
        <TextField sx={{ width: "100%" }} placeholder="Nama Karyawan" id="outlined-size-small" size="small" />
      </Box>
      <Box>
        <Typography sx={{ fontSize: "16px" }}>Rate</Typography>
        <TextField
          sx={{ width: "100%" }}
          placeholder="Rate"
          id="outlined-size-small"
          size="small"
          InputProps={{
            startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
            endAdornment: <InputAdornment position="end">/Jam</InputAdornment>,
          }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, marginTop: 1 }}>
        <Button sx={{ backgroundColor: "#F7F8FB", width: "48%", color: "#2775EC", fontSize: "12px" }} variant="outlined">
          Batalkan
        </Button>
        <Button sx={{ backgroundColor: "#2775EC", width: "48%", fontSize: "12px" }} variant="contained" onClick={handleSubmit}>
          Simpan
        </Button>
      </Box>
    </Card>
  );
}
