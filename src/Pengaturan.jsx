import { Box, Button, Card, InputAdornment, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function Pengaturan() {
  const navigate = useNavigate();
  const initialState = { nama: "", rate: "" };
  const [addEmployee, setAddEmployee] = useState(initialState);
  const [error, setError] = useState(initialState);

  const onChangeEmployee = (nama, value) => {
    if (nama === "rate") {
      const num = !isNaN(value) ? value : "";
      setAddEmployee((prev) => ({
        ...prev,
        [nama]: num,
      }));
      setError({
        ...error,
        rate: "",
      });
    } else {
      const regex = /^[a-zA-Z\s]+$/;
      setAddEmployee((prev) => {
        if (regex.test(value)) {
          setError({
            ...error,
            nama: "",
          });
          return {
            ...prev,
            [nama]: value,
          };
        } else {
          return {
            ...prev,
            [nama]: "",
          };
        }
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (addEmployee.nama !== "" && addEmployee.rate !== "") {
      try {
        await axios.post("http://localhost:3000/karyawan", addEmployee);
        setAddEmployee(addEmployee);
        navigate("/");
        setAddEmployee(initialState);
      } catch (err) {
        console.error(err);
      }
    } else {
      if (addEmployee.nama === "" && addEmployee.rate === "") {
        setError({
          ...error,
          nama: "Nama tidak boleh kosong!",
          rate: "Rate tidak boleh kosong!",
        });
      } else if (addEmployee.nama === "") {
        setError({
          ...error,
          nama: "Nama tidak boleh kosong!",
        });
      } else if (addEmployee.rate === "") {
        setError({
          ...error,
          rate: "Rate tidak boleh kosong!",
        });
      }
    }
  };

  const handleCancel = () => {
    setAddEmployee(initialState);
    setError(initialState);
  };

  return (
    <Card variant="outlined" sx={{ width: "25vw", height: "30%", margin: "50px auto", padding: 5, display: "flex", flexDirection: "column", gap: 2 }}>
      <Box marginBottom={1}>
        <Typography sx={{ fontSize: "16px" }}>Nama Karyawan</Typography>
        <TextField sx={{ width: "100%" }} placeholder="Nama Karyawan" size="small" value={addEmployee.nama} onChange={(e) => onChangeEmployee("nama", e.target.value)} />
        <Typography position={"absolute"} color={"red"}>
          {error.nama}
        </Typography>
      </Box>
      <Box marginBottom={1}>
        <Typography sx={{ fontSize: "16px" }}>Rate</Typography>
        <TextField
          sx={{ width: "100%" }}
          placeholder="Rate"
          value={addEmployee.rate}
          onChange={(e) => onChangeEmployee("rate", e.target.value)}
          size="small"
          InputProps={{
            startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
            endAdornment: <InputAdornment position="end">/Jam</InputAdornment>,
          }}
        />
        <Typography position={"absolute"} color={"red"}>
          {error.rate}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, marginTop: 1 }}>
        <Button sx={{ backgroundColor: "#F7F8FB", width: "48%", color: "#2775EC", fontSize: "12px" }} variant="outlined" onClick={handleCancel}>
          Batalkan
        </Button>
        <Button sx={{ backgroundColor: "#2775EC", width: "48%", fontSize: "12px" }} variant="contained" onClick={handleSubmit}>
          Simpan
        </Button>
      </Box>
    </Card>
  );
}
