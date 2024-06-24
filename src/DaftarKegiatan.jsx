import Header from "./component/header";
import { Box, Button, FormControl, IconButton, MenuItem, Modal, Paper, Select, TextField, Typography } from "@mui/material";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "./component/navbar";
import { useEffect, useState } from "react";
import { addKegiatan, addProyek, deleteKegiatan, getKaryawan, getProyek } from "./service";
import { DataGrid } from "@mui/x-data-grid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 2,
};

export default function DaftarKegiatan() {
  const [dataProyek, setDataProyek] = useState();
  const [dataKaryawan, setDataKaryawan] = useState([]);

  const [triger, setTriger] = useState(false);

  const [dataAddProyek, setDataAddproyek] = useState({
    nama_proyek: "",
  });

  const [dataAddKegiatan, setDataKegiatan] = useState({
    judul: "",
    proyek: "",
    tgl_mulai: "",
    tgl_berakhir: "",
    waktu_mulai: "",
    waktu_berakhir: "",
    id_karyawan: "",
  });
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [selectedTimeEnd, setSelectedTimeEnd] = useState();
  const [open, setOpen] = useState(false);
  const [openProyek, setOpenProyek] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  const handleOpen = (item) => {
    setOpen(true);
    setDataKegiatan({ ...dataAddKegiatan, id_karyawan: item });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (id) => {
    console.log(`Edit row with id: ${id}`);
  };

  const handleDelete = async (id) => {
    const result = await deleteKegiatan(id);
    if (result === "success") {
      setTriger(!triger);
    } else {
      console.error(`Failed to delete row with id: ${id}`);
    }
  };

  const columnKegiatan = [
    { field: "judul", headerName: "Judul Kegiatan", width: 200 },
    { field: "proyek", headerName: "Nama Proyek", width: 200 },
    { field: "tgl_mulai", headerName: "Tanggal Mulai", width: 150 },
    { field: "tgl_berakhir", headerName: "Tanggal Berakhir", width: 125 },
    { field: "waktu_mulai", headerName: "Waktu Mulai", width: 150 },
    { field: "waktu_berakhir", headerName: "Waktu Berakhir", width: 125 },
    { field: "durasi", headerName: "Durasi", width: 150 },
    {
      field: "aksi",
      headerName: "AKSI",
      width: 100,
      renderCell: (params) => (
        <>
          <IconButton sx={{ color: "#ff8da1" }} onClick={() => handleEdit(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton sx={{ color: "#ff8da1" }} onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const getDataKaryawan = async () => {
    try {
      const fetch = await getKaryawan();
      setDataKaryawan(fetch);
    } catch (err) {
      console.log(err);
    }
  };

  const getDataProyek = async () => {
    try {
      const fetch = await getProyek();
      setDataProyek(fetch);
    } catch (err) {
      console.log(err);
    }
  };

  const tambahProyek = () => {
    setOpen(false);
    setOpenProyek(true);
  };

  const handleCloseProyek = () => {
    setOpenProyek(false);
    setOpen(true);
  };

  const handleChangeAddProyek = (e) => {
    setDataAddproyek({ ...dataAddProyek, nama_proyek: e.target.value });
  };

  const handleOnchangeKegiatan = (nama, value) => {
    if (nama === "tgl_mulai") {
      setStartDate(value);
      setDataKegiatan({
        ...dataAddKegiatan,
        tgl_mulai: dayjs(value, "YYYY-MM-DD").format("DD MMM YYYY"),
      });
    } else if (nama === "tgl_berakhir") {
      setEndDate(value);
      setDataKegiatan({
        ...dataAddKegiatan,
        tgl_berakhir: dayjs(value, "YYYY-MM-DD").format("DD MMM YYYY"),
      });
    } else if (nama === "waktu_mulai") {
      setSelectedTime(value);
      setDataKegiatan({
        ...dataAddKegiatan,
        waktu_mulai: dayjs(value, "HH:mm").format("HH:mm"),
      });
    } else if (nama === "waktu_berakhir") {
      setSelectedTimeEnd(value);
      setDataKegiatan({
        ...dataAddKegiatan,
        waktu_berakhir: dayjs(value, "HH:mm").format("HH:mm"),
      });
    } else {
      setDataKegiatan((prev) => ({
        ...prev,
        [nama]: value,
      }));
    }
  };

  const handleAddProyek = async () => {
    try {
      const add = await addProyek(dataAddProyek);
      if (add === "success") {
        setOpenProyek(false);
        setOpen(true);
        setTriger(!triger);
        alert("Tambah Proyek Baru Berhasil.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddKegiatan = async () => {
    const waktuMulai = dayjs(`${dataAddKegiatan.tgl_mulai} ${dataAddKegiatan.waktu_mulai}`, "DD-MMMM-YYYY HH:mm");
    const waktuSelesai = dayjs(`${dataAddKegiatan.tgl_berakhir} ${dataAddKegiatan.waktu_berakhir}`, "DD-MMMM-YYYY HH:mm");
    if (!waktuMulai.isValid() || !waktuSelesai.isValid()) {
      console.error("Invalid date format");
      return;
    }
    const durasiMenit = waktuSelesai.diff(waktuMulai, "minute");
    const durasiJam = Math.floor(durasiMenit / 60);
    const durasiSisaMenit = durasiMenit % 60;
    const durasi = durasiJam === 0 ? `${durasiSisaMenit} menit` : durasiSisaMenit === 0 ? `${durasiJam} jam` : `${durasiJam} jam ${durasiSisaMenit} menit`;
    const params = {
      ...dataAddKegiatan,
      durasi: durasi,
    };
    try {
      const add = await addKegiatan(params);
      if (add === "success") {
        setOpen(false);
        setTriger(!triger);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDataKaryawan();
    getDataProyek();
  }, [triger]);

  const filterKegiatan = (kegiatan) => {
    return kegiatan.filter(
      (item) =>
        item.proyek.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.judul.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.tgl_mulai.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.tgl_berakhir.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.waktu_mulai.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.waktu_berakhir.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.durasi.toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  return (
    <Box sx={{ backgroundColor: "#F7F8FB" }}>
      <Header />
      <Navbar />
      {/* Modal Tambah Kegiatan */}
      <div className="modal-tambah-kegiatan">
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Box display={"flex"} justifyContent={"space-between"} marginY={1}>
              <Typography id="modal-modal-title" fontSize={"14px"} fontWeight={"bold"}>
                Tambah Kegiatan Baru
              </Typography>
              <IconButton open={open} onClick={handleClose} sx={{ color: "black", margin: 0, padding: 0 }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
            <Box display={"flex"} gap={1} color={"#808080"}>
              <Box>
                <Typography fontSize={"12px"}>Tanggal Mulai</Typography>
                <DatePicker selected={startDate && startDate} onChange={(e) => handleOnchangeKegiatan("tgl_mulai", e)} placeholderText="Pilih Tanggal" />
              </Box>
              <Box>
                <Typography fontSize={"12px"}>Tanggal Berakhir</Typography>
                <DatePicker selected={endDate && endDate} onChange={(e) => handleOnchangeKegiatan("tgl_berakhir", e)} placeholderText="Pilih Tanggal" />
              </Box>
              <Box>
                <Typography fontSize={"12px"}>Waktu Mulai</Typography>
                <DatePicker
                  selected={selectedTime && selectedTime}
                  onChange={(e) => handleOnchangeKegiatan("waktu_mulai", e)}
                  dateFormat="HH:mm"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeFormat="HH:mm"
                  placeholderText="Pilih Waktu"
                />
              </Box>
              <Box>
                <Typography fontSize={"12px"}>Waktu Berakhir</Typography>
                <DatePicker
                  selected={selectedTimeEnd && selectedTimeEnd}
                  onChange={(e) => handleOnchangeKegiatan("waktu_berakhir", e)}
                  dateFormat="HH:mm"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeFormat="HH:mm"
                  placeholderText="Pilih Waktu"
                />
              </Box>
            </Box>
            <Box color={"#808080"} marginTop={1}>
              <Typography>Judul Kegiatan</Typography>
              <TextField size="small" sx={{ width: "100%" }} onChange={(e) => handleOnchangeKegiatan("judul", e.target.value)} />
            </Box>
            <Box color={"#808080"}>
              <Typography>Nama Proyek</Typography>
              <FormControl fullWidth size="small">
                <Select labelId="demo-select-small-label" id="demo-select-small" value={dataAddProyek.nama} label="Age" onChange={(e) => handleOnchangeKegiatan("proyek", e.target.value)}>
                  <MenuItem className="modal-tambah-proyek" sx={{ color: "red" }} onClick={tambahProyek}>
                    + Tambah Proyek
                  </MenuItem>
                  {dataProyek?.map((item) => (
                    <MenuItem key={item.id} value={item.nama_proyek}>
                      {item.nama_proyek}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "end", gap: 2, margin: 2 }}>
              <Button open={open} onClick={handleClose} sx={{ backgroundColor: "#F7F8FB", width: "20%", color: "#F15858", fontSize: "10px" }} variant="text">
                Kembali
              </Button>
              <Button onClick={handleAddKegiatan} sx={{ backgroundColor: "#F15858", width: "20%", fontSize: "10px" }} variant="contained" color="error">
                Simpan
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
      {/* Aklhir Modal Tambah Kegiatan */}

      {/* Modal Tambah Proyek */}
      <Box>
        <Modal open={openProyek} onClose={handleCloseProyek} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography id="modal-modal-title" fontSize={"12px"} fontWeight={"bold"}>
                Tambah Proyek Baru
              </Typography>
              <Typography id="modal-modal-description">X</Typography>
            </Box>
            <Box>
              <Typography fontSize={"12px"}>Nama Proyek *</Typography>
              <TextField
                fullWidth
                value={dataAddProyek.nama_proyek}
                onChange={(e) => {
                  handleChangeAddProyek(e);
                }}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "end", gap: 2, margin: 2 }}>
              <Button onClick={handleCloseProyek} sx={{ backgroundColor: "#F7F8FB", width: "20%", color: "#F15858", fontSize: "10px" }} variant="text">
                Kembali
              </Button>
              <Button onClick={handleAddProyek} sx={{ backgroundColor: "#F15858", width: "20%", fontSize: "10px" }} variant="contained" color="error">
                Simpan
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
      {/* Akhir Modal Tambah Proyek */}

      {/* Daftar Kegiatan */}
      <Box m={3}>
        {dataKaryawan.length !== 0 &&
          dataKaryawan.map((item, index) => {
            return (
              <Paper key={index} sx={{ marginBottom: "10px" }}>
                <Box p={2} display="flex" sx={{ gap: 5, borderBottom: "2px solid #F7F8FB" }}>
                  <Box>
                    <Typography sx={{ fontSize: "14px" }}>Nama Karyawan</Typography>
                    <Typography>{item.nama}</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: "14px" }}>Rate</Typography>
                    <Typography>{item.rate}</Typography>
                  </Box>
                </Box>
                <Box p={2} display={"flex"} justifyContent={"space-between"} alignItems="center">
                  <Box display={"flex"} gap={3}>
                    <Typography variant="h6">Daftar Kegiatan</Typography>
                    {/* Button Tambah Kegiatan */}
                    <Button onClick={() => handleOpen(item.id)} variant="outlined" size="small" startIcon={<AddCircleOutlineTwoToneIcon />} sx={{ backgroundColor: "#F0F6FF", color: "#2775EC", textTransform: "none" }}>
                      Tambah Kegiatan
                    </Button>
                  </Box>
                  <Box>
                    <TextField
                      variant="outlined"
                      size="small"
                      placeholder="Cari"
                      value={filterValue}
                      onChange={(e) => setFilterValue(e.target.value)}
                      InputProps={{
                        startAdornment: <SearchIcon />,
                      }}
                    />
                  </Box>
                </Box>

                <DataGrid
                  autoHeight
                  rows={filterKegiatan(dataKaryawan.flatMap((karyawan) => karyawan.kegiatan))}
                  columns={columnKegiatan}
                  pageSize={5}
                  rowsPerPageOptions={[5, 10, 20]}
                  localeText={{
                    noRowsLabel: "No activities yet",
                    footerRowSelected: (count) => (count !== 1 ? `${count.toLocaleString()} rows selected` : `${count.toLocaleString()} row selected`),
                  }}
                />
                <Box display={"flex"} justifyContent={"space-between"} padding={2} color={"#2775EC"}>
                  <Typography>Total Durasi</Typography>
                  <Typography>8 Jam 50 Menit</Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} padding={2} marginTop={-3} color={"#2775EC"}>
                  <Typography fontWeight={600}>Total Pendapatan</Typography>
                  <Typography fontWeight={600}>Rp200000</Typography>
                </Box>
              </Paper>
            );
          })}
      </Box>
      {/* Akhir daftar kegiatan */}
    </Box>
  );
}
