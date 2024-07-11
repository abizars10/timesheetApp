import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Button, Modal, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import axios from "axios";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function ModalFilter() {
  const [dataProyek, setDataProyek] = React.useState([]);
  const [selectedProyek, setSelectedProyek] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchDataProyek = async () => {
    try {
      const response = await axios.get("http://localhost:3000/proyek");
      setDataProyek(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedProyek(typeof value === "string" ? value.split(",") : value);
  };

  React.useEffect(() => {
    fetchDataProyek();
  }, []);

  return (
    <Box>
      <Button onClick={handleOpen} variant="outlined" size="large">
        <FilterListIcon />
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography alignContent={"center"} fontWeight={"bold"}>
              Filter
            </Typography>
            <Button onClick={handleClose} sx={{ color: "black", fontWeight: "bold", marginRight: -2 }}>
              x
            </Button>
          </Box>
          <FormControl sx={{ m: 1, width: 375 }}>
            <InputLabel id="demo-multiple-chip-label">Proyek</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={selectedProyek}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {Array.isArray(dataProyek) &&
                dataProyek.map((item) => (
                  <MenuItem key={item.id} value={item.nama_proyek}>
                    {item.nama_proyek}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Box display={"flex"} justifyContent={"end"}>
            <Button onClick={handleClose}>Kembali</Button>
            <Button>Simpan</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
