/* eslint-disable react/prop-types */
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

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

const RequiredLabel = ({ children }) => (
  <Typography display="flex" fontSize={"12px"}>
    {children}
    <Typography component={"span"} color="#F15858">
      *
    </Typography>
  </Typography>
);

export default function ModalAddProyek({ open, onClose, handleAddProyek }) {
  const [addProyek, setAddProyek] = useState({ nama_proyek: "" });

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/proyek", addProyek);
      // console.log(addProyek);
      handleAddProyek();
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    setAddProyek({ nama_proyek: "" });
    onClose();
  };

  const handleChangeProyek = (e) => {
    const { name, value } = e.target;
    setAddProyek((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography alignContent={"center"} fontWeight={"bold"}>
            Tambah Proyek Baru
          </Typography>
          <Button onClick={onClose} sx={{ color: "black", fontWeight: "bold", marginRight: -2 }}>
            x
          </Button>
        </Box>
        <RequiredLabel>Proyek Baru</RequiredLabel>
        <TextField fullWidth size="small" value={addProyek.nama_proyek} name="nama_proyek" onChange={handleChangeProyek} />
        <Box display={"flex"} justifyContent={"end"} marginTop={1} gap={3}>
          <Button onClick={handleClose}>Kembali</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Simpan
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
