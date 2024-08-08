/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Box, Button, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalAddProyek from "./ModalAddProyek";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

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

export default function ModalForm({ open, onClose, karyawanId, onTrigger, isEditing, selectedData, onForm }) {
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
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [error, setError] = useState(initialKegiatan);

  useEffect(() => {
    if (isEditing && selectedData) {
      setAddKegiatan((prev) => ({
        ...prev,
        ...selectedData,
        proyek: dataProyek.find((proyek) => proyek.nama_proyek === selectedData.proyek) ? selectedData.proyek : "",
      }));
    }
  }, [isEditing, selectedData, dataProyek]);

  const fetchDataProyek = async () => {
    try {
      const response = await axios.get("http://localhost:3000/proyek");
      setDataProyek(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeKegiatan = (name, value) => {
    if (name === "tgl_mulai") {
      setStartDate(value);
      setAddKegiatan((prev) => ({
        ...prev,
        tgl_mulai: dayjs(value, "YYYY-MM-DD").format("DD MMM YYYY"),
      }));
    } else if (name === "tgl_berakhir") {
      setEndDate(value);
      setAddKegiatan((prev) => ({
        ...prev,
        tgl_berakhir: dayjs(value, "YYYY-MM-DD").format("DD MMM YYYY"),
      }));
    } else if (name === "waktu_mulai") {
      setStartTime(value);
      setAddKegiatan((prev) => ({
        ...prev,
        waktu_mulai: dayjs(value, "HH:mm").format("HH:mm"),
      }));
    } else if (name === "waktu_berakhir") {
      setEndTime(value);
      setAddKegiatan((prev) => ({
        ...prev,
        waktu_berakhir: dayjs(value, "HH:mm").format("HH:mm"),
      }));
    } else {
      setAddKegiatan((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddKegiatan = async () => {
    const { tgl_mulai, waktu_mulai, tgl_berakhir, waktu_berakhir } = addKegiatan;
    if (!tgl_mulai || !waktu_mulai || !tgl_berakhir || !waktu_berakhir) {
      console.error("Tanggal atau waktu tidak boleh kosong");
      setError({ ...error, tgl_mulai: "Form Kegiatan Harus Berisi Data!" });
      return;
    }

    const waktuMulai = dayjs(`${tgl_mulai} ${waktu_mulai}`, "DD MMM YYYY HH:mm");
    const waktuSelesai = dayjs(`${tgl_berakhir} ${waktu_berakhir}`, "DD MMM YYYY HH:mm");

    if (!waktuMulai.isValid() || !waktuSelesai.isValid()) {
      console.error("Format tanggal tidak valid");
      return;
    }

    const durasiMenit = waktuSelesai.diff(waktuMulai, "minute");
    const durasiJam = Math.floor(durasiMenit / 60);
    const durasiSisaMenit = durasiMenit % 60;
    const durasi = durasiJam === 0 ? `${durasiSisaMenit} menit` : durasiSisaMenit === 0 ? `${durasiJam} jam` : `${durasiJam} jam ${durasiSisaMenit} menit`;

    const params = {
      ...addKegiatan,
      durasi: durasi,
    };
    try {
      if (isEditing && selectedData) {
        await axios.put(`http://localhost:3000/kegiatan/${selectedData.id}`, params);
      } else {
        await axios.post("http://localhost:3000/kegiatan", params);
      }
      onTrigger();
      onForm();
      onClose();
    } catch (err) {
      console.error("Error menambahkan kegiatan:", err);
    }
  };

  const handleClose = () => {
    setAddKegiatan(initialKegiatan);
    setError(initialKegiatan);
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

  useEffect(() => {
    if (open) {
      fetchDataProyek();
    } else {
      setAddKegiatan(initialKegiatan);
      setStartDate(null);
      setEndDate(null);
      setStartTime(null);
      setEndTime(null);
    }
  }, [open]);

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
            <DatePicker className="custom-date-picker-input " selected={startDate} onChange={(date) => handleChangeKegiatan("tgl_mulai", date)} placeholderText="Pilih Tanggal" dateFormat={"dd MMM YYYY"} />
          </Box>
          <Box>
            <RequiredLabel>Tanggal Berakhir</RequiredLabel>
            <DatePicker className="custom-date-picker-input " selected={endDate} onChange={(date) => handleChangeKegiatan("tgl_berakhir", date)} placeholderText="Pilih Tanggal" dateFormat={"dd MMM YYYY"} />
          </Box>
          <Box>
            <RequiredLabel>Waktu Mulai</RequiredLabel>
            <DatePicker
              className="custom-date-picker-input "
              selected={startTime}
              onChange={(time) => handleChangeKegiatan("waktu_mulai", time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              dateFormat={"HH:mm"}
              timeFormat="HH:mm"
              placeholderText="Pilih Waktu"
            />
          </Box>
          <Box>
            <RequiredLabel>Waktu Berakhir</RequiredLabel>
            <DatePicker
              className="custom-date-picker-input "
              selected={endTime}
              onChange={(time) => handleChangeKegiatan("waktu_berakhir", time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              dateFormat={"HH:mm"}
              timeFormat="HH:mm"
              placeholderText="Pilih Waktu"
            />
          </Box>
        </Box>

        <Box>
          <RequiredLabel>Judul Kegiatan</RequiredLabel>
          <TextField fullWidth size="small" value={addKegiatan.judul} onChange={(e) => handleChangeKegiatan("judul", e.target.value)} name="judul" />
          <RequiredLabel>Nama Proyek</RequiredLabel>
          <Select fullWidth size="small" value={addKegiatan.proyek || ""} onChange={(e) => handleChangeKegiatan("proyek", e.target.value)} name="proyek">
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

        <Box display={"flex"} justifyContent={"space-between"} marginTop={1} gap={3}>
          <Box>
            <Typography color={"red"} fontSize={"small"}>
              {error.tgl_mulai}
            </Typography>
          </Box>
          <Box>
            <Button onClick={handleClose}>Kembali</Button>
            <Button variant="contained" onClick={handleAddKegiatan}>
              Simpan
            </Button>
          </Box>
        </Box>
        <ModalAddProyek open={openAddProyek} onClose={handleCloseAddProyek} handleAddProyek={handleAddProyek} />
      </Box>
    </Modal>
  );
}
