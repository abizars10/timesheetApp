/* eslint-disable react/prop-types */
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";

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

export default function ModalForm({ karyawanId }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const RequiredLabel = ({ children }) => (
    <Typography display="flex">
      {children}
      <Typography component={"span"} color="red">
        *
      </Typography>
    </Typography>
  );

  const handleSubmit = () => {
    console.log("Karyawan ID:", karyawanId);
    // Lakukan sesuatu dengan karyawanId, seperti mengirim data ke API
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined" size="small" startIcon={<AddCircleOutlineIcon />} sx={{ backgroundColor: "#F0F6FF", Color: " #2775EC", textTransform: "none" }}>
        Tambah Kegiatan
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography alignContent={"center"} fontWeight={"bold"}>
              Tambah Kegiatan
            </Typography>
            <Button onClick={handleClose} sx={{ color: "black", fontWeight: "bold", marginRight: -2 }}>
              x
            </Button>
          </Box>
          <Box display={"flex"} gap={1}>
            <Box>
              <RequiredLabel>Tanggal Mulai</RequiredLabel>
              <TextField fullWidth size="small" />
            </Box>
            <Box>
              <RequiredLabel>Tanggal Berakhir</RequiredLabel>
              <TextField fullWidth size="small" />
            </Box>
            <Box>
              <RequiredLabel>Waktu Mulai</RequiredLabel>
              <TextField fullWidth size="small" />
            </Box>
            <Box>
              <RequiredLabel>Waktu Berakhir</RequiredLabel>
              <TextField fullWidth size="small" />
            </Box>
          </Box>

          <Box>
            <RequiredLabel>Judul Kegiatan</RequiredLabel>
            <TextField fullWidth size="small" />
            <RequiredLabel>Nama Proyek</RequiredLabel>
            <TextField fullWidth size="small" />
          </Box>

          <Box display={"flex"} justifyContent={"end"}>
            <Button onClick={handleClose}>Kembali</Button>
            <Button onClick={handleSubmit}>Simpan</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
