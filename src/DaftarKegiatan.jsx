import Header from "./component/header";
import { Autocomplete, Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "./component/navbar";

export default function DaftarKegiatan() {
  const contoh = [{ label: "The Shawshank Redemption" }, { label: "The Godfather" }, { label: "The Godfather: Part II" }];
  return (
    <Box sx={{ backgroundColor: "#F7F8FB", height: "100vh" }}>
      <Header />
      <Navbar />
      <Box m={3}>
        <Paper>
          <Box p={2} display="flex" sx={{ gap: 5, borderBottom: "2px solid #F7F8FB" }}>
            <Box>
              <Typography sx={{ fontSize: "14px" }}>Nama Karyawan</Typography>
              <Typography>Timothy Pradana</Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: "14px" }}>Rate</Typography>
              <Typography>Rp12.000/jam</Typography>
            </Box>
          </Box>
          <Box p={2} display={"flex"} justifyContent={"space-between"} alignItems="center">
            <Box display={"flex"} gap={3}>
              <Typography variant="h6">Daftar Kegiatan</Typography>
              <Button variant="outlined" size="small" startIcon={<AddCircleOutlineTwoToneIcon />} sx={{ backgroundColor: "#F0F6FF", color: "#2775EC", textTransform: "none" }}>
                Tambah Kegiatan
              </Button>
            </Box>
            <Box>
              <Autocomplete
                disablePortal
                id="free-solo-demo"
                freeSolo
                options={contoh}
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    size="small"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <Box display="flex" alignItems="center" sx={{ mr: 1 }}>
                          <SearchIcon sx={{ color: "gray", fontSize: "20px" }} />
                          {params.InputProps.startAdornment}
                        </Box>
                      ),
                    }}
                    label="cari"
                  />
                )}
              />
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Judul Kegiatan</TableCell>
                  <TableCell>Nama Proyek</TableCell>
                  <TableCell>Tanggal Mulai</TableCell>
                  <TableCell>Tanggal Berakhir</TableCell>
                  <TableCell>Waktu Mulai</TableCell>
                  <TableCell>Waktu Berakhir</TableCell>
                  <TableCell>Durasi</TableCell>
                  <TableCell>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    Belum ada kegiatan
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Box p={2} display={"flex"} justifyContent={"space-between"} color={"#2775EC"}>
              <Typography>Total Durasi</Typography>
              <Typography>8 jam 50 Menit</Typography>
            </Box>
            <Box p={2} display={"flex"} justifyContent={"space-between"} marginTop={-3} color={"#2775EC"}>
              <Typography fontWeight={"bold"}>Pendapatan</Typography>
              <Typography fontWeight={"bold"}>Rp200.000</Typography>
            </Box>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
}
