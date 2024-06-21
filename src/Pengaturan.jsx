import { Box, Button, Card, InputAdornment, TextField, Typography } from "@mui/material";
import Header from "./component/header";
import Navbar from "./component/navbar";
import { useState } from "react";
import { addKaryawan } from "./service";

export default function DaftarKegiatan() {
  const [dataKaryawan, setDataKaryawan] = useState({ nama: "", rate: "" });
  const onChangeKaryawan = (nama, value) => {
    if (nama === "rate") {
      const baru = !isNaN(value) ? value : "";
      setDataKaryawan((prev) => ({
        ...prev,
        [nama]: baru,
      }));
    } else {
      setDataKaryawan((prev) => ({
        ...prev,
        [nama]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const fetch = await addKaryawan(dataKaryawan);
      console.log(fetch);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box sx={{ backgroundColor: "#F7F8FB", height: "100vh" }}>
      <Header />
      <Navbar />
      <Box sx={{ height: "70%", display: "flex", alignItems: "center" }}>
        <Card variant="outlined" sx={{ width: "25vw", height: "30vh", margin: "auto", padding: 5, display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <Typography sx={{ fontSize: "12px" }}>Nama Karyawan</Typography>
            <TextField sx={{ width: "100%" }} value={dataKaryawan.nama} placeholder="Nama Karyawan" id="outlined-size-small" size="small" onChange={(e) => onChangeKaryawan("nama", e.target.value)} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: "12px" }}>Rate</Typography>
            <TextField
              sx={{ width: "100%" }}
              value={dataKaryawan.rate}
              placeholder="Rate"
              id="outlined-size-small"
              onChange={(e) => onChangeKaryawan("rate", e.target.value)}
              size="small"
              InputProps={{
                startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                endAdornment: <InputAdornment position="end">/Jam</InputAdornment>,
              }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button sx={{ backgroundColor: "#F7F8FB", width: "48%", color: "#2775EC", fontSize: "10px" }} variant="text">
              Batalkan
            </Button>
            <Button sx={{ backgroundColor: "#2775EC", width: "48%", fontSize: "10px" }} variant="contained" onClick={handleSubmit}>
              Simpan
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
