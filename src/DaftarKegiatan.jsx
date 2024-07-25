import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import TableData from "./component/TableData";
import ModalForm from "./component/ModalForm";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalFilter from "./component/ModalFilter";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function DaftarKegiatan() {
  const [open, setOpen] = useState(false);
  const [selectedKaryawanId, setSelectedKaryawanId] = useState(null);
  const [dataKaryawan, setDataKaryawan] = useState([]);
  const [filterData, setFilterData] = useState("");
  const [trigger, setTrigger] = useState(false);

  const handleTrigger = () => {
    setTrigger(true);
  };

  const handleOpen = (id) => {
    setSelectedKaryawanId(id);
    setOpen(true);
    console.log(id);
  };

  const handleClose = () => setOpen(false);

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
        setDataKaryawan((prev) => prev.filter((data) => data.id !== id));
        console.log(`ID yang dihapus: ${id}`);
      }
    } catch (err) {
      console.error("Error saat menghapus data:", err);
    }
  };

  const filterKegiatan = (kegiatan) => {
    return kegiatan.filter(
      (item) =>
        item.proyek.toLowerCase().includes(filterData.toLowerCase()) ||
        item.judul.toLowerCase().includes(filterData.toLowerCase()) ||
        item.tgl_mulai.toLowerCase().includes(filterData.toLowerCase()) ||
        item.tgl_berakhir.toLowerCase().includes(filterData.toLowerCase()) ||
        item.waktu_mulai.toLowerCase().includes(filterData.toLowerCase()) ||
        item.waktu_berakhir.toLowerCase().includes(filterData.toLowerCase()) ||
        item.durasi.toLowerCase().includes(filterData.toLowerCase())
    );
  };

  useEffect(() => {
    fetchDataKaryawan();
    if (trigger) {
      fetchDataKaryawan();
      setTrigger(false);
    }
  }, [trigger]);

  return (
    <Box>
      {dataKaryawan.length !== 0 &&
        dataKaryawan.map((item) => (
          <Box key={item.id} sx={{ margin: "1.5% auto", background: "#fff", width: "96%", paddingBottom: "50px", borderRadius: "10px" }}>
            <Box display={"flex"} justifyContent={"space-between"} padding={2} boxShadow={"0 5px #f7f8fb"}>
              <Box display={"flex"} gap={5}>
                <Box>
                  <Typography>Nama Karyawan</Typography>
                  <Typography>{item.nama}</Typography>
                </Box>
                <Box>
                  <Typography>Rate</Typography>
                  <Typography>Rp{parseFloat(item.rate).toLocaleString("id-ID")}/Jam</Typography>
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
                <Button onClick={() => handleOpen(item.id)} variant="outlined" size="small" startIcon={<AddCircleOutlineIcon />} sx={{ backgroundColor: "#F0F6FF", color: "#2775EC", textTransform: "none" }}>
                  Tambah Kegiatan
                </Button>
              </Box>
              <Box alignItems={"center"} padding={3} display={"flex"} gap={1}>
                <TextField
                  size="small"
                  placeholder="Cari"
                  value={filterData}
                  onChange={(e) => setFilterData(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ color: "#d3d3d3" }} />,
                  }}
                />
                <ModalFilter />
              </Box>
            </Box>
            <Box>
              <TableData karyawanId={item.id} filteredData={filterKegiatan} rate={item.rate} open={handleOpen} onTrigger={handleTrigger} />
            </Box>
          </Box>
        ))}
      {/* Modal Form Data Kegiatan */}
      {selectedKaryawanId && <ModalForm open={open} onClose={handleClose} karyawanId={selectedKaryawanId} onTrigger={handleTrigger} />}
    </Box>
  );
}
