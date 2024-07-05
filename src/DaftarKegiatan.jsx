import { Box, Button, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TableData from "./component/TableData";
// import TableData from "./Component/TableData";
// import GetData from "./Component/GetData";

export default function DaftarKegiatan() {
  return (
    <Box sx={{ margin: "1.5% auto", background: "#fff", width: "96%", paddingBottom: "50px", borderRadius: "10px" }}>
      <Box display={"flex"} gap={5} padding={3} boxShadow={"0 5px #f7f8fb"}>
        <Box>
          <Typography>Nama Karyawan</Typography>
          <Typography fontWeight={"bold"}>Shyane Pattynama</Typography>
        </Box>
        <Box>
          <Typography>Rate</Typography>
          <Typography fontWeight={"bold"}>Rp.50000/Jam</Typography>
        </Box>
      </Box>
      <Box>
        <Box display={"flex"} padding={3} alignItems={"center"} gap={3}>
          <Typography fontWeight={"bold"}>Daftar Kegiatan</Typography>
          <Button variant="outlined" startIcon={<AddCircleOutlineIcon />} sx={{ backgroundColor: "#F0F6FF", Color: " #2775EC" }}>
            Tambah Kegiatan
          </Button>
        </Box>
      </Box>
      <Box>
        <TableData />
      </Box>
      <Box sx={{ marginX: 3, backgroundColor: "#ddd", padding: 1.5, borderRadius: "0 0 10px 10px" }}>
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
