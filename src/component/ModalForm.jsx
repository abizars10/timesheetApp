/* eslint-disable react/prop-types */
import { Box, Button, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalAddProyek from "./ModalAddProyek";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "12px",
  p: 2,
};

export default function ModalForm({ open, onClose, karyawanId, handleKegiatan }) {
  const initialKegiatan = {
    judul: "",
    proyek: "",
    tgl_mulai: "",
    tgl_berakhir: "",
    waktu_mulai: "",
    waktu_berakhir: "",
    durasi: "",
    id_karyawan: karyawanId,
  };

  const [addKegiatan, setAddKegiatan] = useState(initialKegiatan);
  const [dataProyek, setDataProyek] = useState([]);
  const [openAddProyek, setOpenAddProyek] = useState(false);

  const fetchDataProyek = async () => {
    try {
      const response = await axios.get("http://localhost:3000/proyek");
      setDataProyek(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeKegiatan = (e) => {
    const { name, value } = e.target;
    setAddKegiatan((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setAddKegiatan(initialKegiatan);
    onClose();
  };

  const handleOpenAddProyek = () => setOpenAddProyek(true);
  const handleCloseAddProyek = () => setOpenAddProyek(false);

  const handleAddProyek = () => {
    fetchDataProyek();
    handleCloseAddProyek();
  };

  const RequiredLabel = ({ children }) => (
    <Typography display="flex">
      {children}
      <Typography component={"span"} color="#F15858">
        *
      </Typography>
    </Typography>
  );

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/kegiatan", addKegiatan);
      setAddKegiatan(initialKegiatan);
      onClose();
      handleKegiatan();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDataProyek();
  }, []);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography alignContent={"center"} fontWeight={"bold"}>
            Tambah Kegiatan
          </Typography>
          <Button onClick={onClose} sx={{ color: "black", fontWeight: "bold", marginRight: -2 }}>
            x
          </Button>
        </Box>
        <Box display={"flex"} gap={1}>
          <Box>
            <RequiredLabel>Tanggal Mulai</RequiredLabel>
            <TextField fullWidth size="small" value={addKegiatan.tgl_mulai} onChange={handleChangeKegiatan} name="tgl_mulai" />
          </Box>
          <Box>
            <RequiredLabel>Tanggal Berakhir</RequiredLabel>
            <TextField fullWidth size="small" value={addKegiatan.tgl_berakhir} onChange={handleChangeKegiatan} name="tgl_berakhir" />
          </Box>
          <Box>
            <RequiredLabel>Waktu Mulai</RequiredLabel>
            <TextField fullWidth size="small" value={addKegiatan.waktu_mulai} onChange={handleChangeKegiatan} name="waktu_mulai" />
          </Box>
          <Box>
            <RequiredLabel>Waktu Berakhir</RequiredLabel>
            <TextField fullWidth size="small" value={addKegiatan.waktu_berakhir} onChange={handleChangeKegiatan} name="waktu_berakhir" />
          </Box>
        </Box>

        <Box>
          <RequiredLabel>Judul Kegiatan</RequiredLabel>
          <TextField fullWidth size="small" value={addKegiatan.judul} onChange={handleChangeKegiatan} name="judul" />
          <RequiredLabel>Nama Proyek</RequiredLabel>
          <Select fullWidth size="small" value={addKegiatan.proyek} onChange={handleChangeKegiatan} name="proyek">
            <MenuItem onClick={handleOpenAddProyek} sx={{ color: "#F15858" }}>
              + Tambah Proyek
            </MenuItem>
            {dataProyek.map((item) => (
              <MenuItem key={item.id} value={item.nama_proyek}>
                {item.nama_proyek}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box display={"flex"} justifyContent={"end"} marginTop={1} gap={3}>
          <Button onClick={handleClose}>Kembali</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Simpan
          </Button>
        </Box>
        <ModalAddProyek open={openAddProyek} onClose={handleCloseAddProyek} handleAddProyek={handleAddProyek} />
      </Box>
    </Modal>
  );
}
