/* eslint-disable react/prop-types */
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "12px",
  p: 2,
};

export default function ModalForm() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const RequiredLabel = ({ children }) => (
    <Typography display="flex">
      {children}
      <Typography color="red">*</Typography>
    </Typography>
  );

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined" size="small" startIcon={<AddCircleOutlineIcon />} sx={{ backgroundColor: "#F0F6FF", Color: " #2775EC" }}>
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
          <Box>
            <RequiredLabel>Judul Kegiatan</RequiredLabel>
            <TextField fullWidth size="small" />
            <RequiredLabel>Nama Proyek</RequiredLabel>
            <TextField fullWidth size="small" select />
          </Box>
          <Box display={"flex"} justifyContent={"end"}>
            <Button onClick={handleClose}>Kembali</Button>
            <Button>Simpan</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
