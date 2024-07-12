/* eslint-disable react/prop-types */
import { Box, Button, MenuItem, Modal, TextField, Typography } from "@mui/material";
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
export default function ModalAddProyek() {
  const [addProyek, setAddProyek] = useState({ nama_proyek: "" });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/proyek", addProyek);
      console.log(addProyek);
      handleClose();
      setAddProyek({ nama_proyek: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => [
    setAddProyek({
      ...addProyek,
      nama_proyek: e.target.value,
    }),
  ];

  const RequiredLabel = ({ children }) => (
    <Typography display="flex" fontSize={"12px"}>
      {children}
      <Typography component={"span"} color="#F15858">
        *
      </Typography>
    </Typography>
  );

  return (
    <Box>
      <MenuItem onClick={handleOpen} sx={{ color: "#F15858" }}>
        + Tambah Proyek
      </MenuItem>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography alignContent={"center"} fontWeight={"bold"}>
              Tambah Proyek Baru
            </Typography>
            <Button onClick={handleClose} sx={{ color: "black", fontWeight: "bold", marginRight: -2 }}>
              x
            </Button>
          </Box>
          <RequiredLabel>Proyek Baru</RequiredLabel>
          <TextField
            fullWidth
            size="small"
            value={addProyek.nama_proyek}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <Box display={"flex"} justifyContent={"end"} marginTop={1} gap={3}>
            <Button onClick={handleClose}>Kembali</Button>
            <Button variant="contained" onClick={handleSubmit}>
              Simpan
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
