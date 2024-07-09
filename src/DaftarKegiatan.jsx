import { Box, IconButton, TextField, Typography } from "@mui/material";
import TableData from "./component/TableData";
import ModalForm from "./component/ModalForm";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DaftarKegiatan() {
  const [dataKaryawan, setDataKaryawan] = useState([]);

  const fetchDataKaryawan = async () => {
    try {
      const response = await axios.get("http://localhost:3000/karyawan");
      setDataKaryawan(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/karyawan/${id}`);
      if (response.status === 200) {
        // Memeriksa status respons
        setDataKaryawan((prev) => prev.filter((data) => data.id !== id));
        console.log(`ID yang dihapus: ${id}`);
      }
    } catch (err) {
      console.error("Error saat menghapus data:", err);
    }
  };

  useEffect(() => {
    fetchDataKaryawan();
  }, []);

  return (
    <Box>
      {dataKaryawan.length !== 0 &&
        dataKaryawan.map((item) => {
          return (
            <Box key={item.id} sx={{ margin: "1.5% auto", background: "#fff", width: "96%", paddingBottom: "50px", borderRadius: "10px" }}>
              <Box display={"flex"} justifyContent={"space-between"} padding={2} boxShadow={"0 5px #f7f8fb"}>
                <Box display={"flex"} gap={5}>
                  <Box>
                    <Typography>Nama Karyawan</Typography>
                    <Typography>{item.nama}</Typography>
                  </Box>
                  <Box>
                    <Typography>Rate</Typography>
                    <Typography>{item.rate}</Typography>
                  </Box>
                </Box>
                <Box>
                  <IconButton sx={{ color: "#ff8da1" }} onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Box display={"flex"} padding={3} alignItems={"center"} gap={3}>
                  <Typography fontWeight={"bold"}>Daftar Kegiatan</Typography>
                  <ModalForm karyawanId={item.id} />
                </Box>
                <Box alignItems={"center"} padding={3}>
                  <TextField
                    size="small"
                    placeholder="Cari"
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ color: "#d3d3d3" }} />,
                    }}
                  />
                </Box>
              </Box>
              <Box>
                <TableData karyawanId={item.id} />
              </Box>
              <Box sx={{ marginX: 3, backgroundColor: "#f4f0ec  ", padding: 1.5, borderRadius: "0 0 10px 10px" }}>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Typography color={"#2775EC"}>Total Durasi</Typography>
                  <Typography color={"#2775EC"}>10Jam 30Menit</Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Typography fontWeight={"bold"} color={"#2775EC"}>
                    Total Pendapatan
                  </Typography>
                  <Typography fontWeight={"bold"} color={"#2775EC"}>
                    Rp502500
                  </Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
    </Box>
  );
}
