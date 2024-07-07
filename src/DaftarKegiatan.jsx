import { Box, Typography } from "@mui/material";
import TableData from "./component/TableData";
import ModalForm from "./component/ModalForm";
import { useEffect, useState } from "react";
import axios from "axios";

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

  useEffect(() => {
    fetchDataKaryawan();
  }, []);

  return (
    <Box sx={{ margin: "1.5% auto", background: "#fff", width: "96%", paddingBottom: "50px", borderRadius: "10px" }}>
      {dataKaryawan.map((item) => (
        <Box key={item.id} display={"flex"} gap={5} padding={2} boxShadow={"0 5px #f7f8fb"}>
          <Box>
            <Typography>Nama Karyawan</Typography>
            <Typography>{item.nama}</Typography>
          </Box>
          <Box>
            <Typography>Rate</Typography>
            <Typography>{item.rate}</Typography>
          </Box>
        </Box>
      ))}
      <Box>
        <Box display={"flex"} padding={3} alignItems={"center"} gap={3}>
          <Typography fontWeight={"bold"}>Daftar Kegiatan</Typography>
          <ModalForm />
        </Box>
      </Box>
      <Box>
        <TableData />
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
}
