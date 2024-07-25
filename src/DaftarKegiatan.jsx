import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import ModalForm from "./component/ModalForm";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalFilter from "./component/ModalFilter";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { DataGrid } from "@mui/x-data-grid";

export default function DaftarKegiatan() {
  const [open, setOpen] = useState(false);
  const [selectedKaryawanId, setSelectedKaryawanId] = useState(null);
  const [dataKaryawan, setDataKaryawan] = useState([]);
  const [filterData, setFilterData] = useState("");

  const columns = [
    { field: "judul", headerName: "Judul Kegiatan", width: 250 },
    {
      field: "proyek",
      headerName: "Nama Proyek",
      width: 150,
      editable: true,
    },
    {
      field: "tgl_mulai",
      headerName: "Tanggal Mulai",
      width: 110,
      editable: true,
    },
    {
      field: "tgl_berakhir",
      headerName: "Tanggal Berakhir",
      width: 120,
      editable: true,
    },
    {
      field: "waktu_mulai",
      headerName: "Waktu Mulai",
      width: 110,
      editable: true,
    },
    {
      field: "waktu_berakhir",
      headerName: "Waktu Berakhir",
      width: 110,
      editable: true,
    },
    {
      field: "durasi",
      headerName: "Durasi",
      width: 120,
      editable: true,
    },
    {
      field: "aksi",
      headerName: "Aksi",
      width: 80,
      renderCell: (params) => (
        <Box>
          <IconButton size="small" sx={{ color: "#ff8da1" }} onClick={() => handleOpen(params.row.id)}>
            <EditIcon fontSize={"small"} />
          </IconButton>
          <IconButton size="small" sx={{ color: "#ff8da1" }} onClick={() => handleDeleteKegiatan(params.row.id)}>
            <DeleteIcon fontSize={"small"} />
          </IconButton>
        </Box>
      ),
    },
  ];

  // const handleSubmit = () => {
  //   fetchDataKaryawan();
  // };

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

  const handleDeleteKegiatan = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/kegiatan/${id}`);
      if (response.status === 200) {
        setDataKaryawan((prev) => prev.filter((data) => data.id !== id));
        console.log(`ID yang dihapus: ${id}`);
      }
    } catch (err) {
      console.error("Error saat menghapus data:", err);
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

  const hitungTotalDurasi = (data) => {
    let totalMenit = 0;

    data.forEach((item) => {
      const durasi = item.durasi.split(" ");
      let menit = 0;

      for (let i = 0; i < durasi.length; i++) {
        if (durasi[i] === "jam") {
          menit += parseInt(durasi[i - 1]) * 60;
        } else if (durasi[i] === "menit") {
          menit += parseInt(durasi[i - 1]);
        }
      }

      totalMenit += menit;
    });

    const totalJam = Math.floor(totalMenit / 60);
    const sisaMenit = totalMenit % 60;

    return !totalJam && !sisaMenit ? `-` : totalJam === 0 ? `${sisaMenit} menit` : sisaMenit === 0 ? `${totalJam} jam` : `${totalJam} jam ${sisaMenit} menit`;
  };

  const hitungTotalPendapatan = (totalDurasi, rate) => {
    const durasi = totalDurasi.split(" ");
    let totalMenit = 0;

    for (let i = 0; i < durasi.length; i++) {
      if (durasi[i] === "jam") {
        totalMenit += parseInt(durasi[i - 1]) * 60;
      } else if (durasi[i] === "menit") {
        totalMenit += parseInt(durasi[i - 1]);
      }
    }

    const totalJam = totalMenit / 60;
    const totalPendapatan = totalJam * rate;

    return totalPendapatan ? `Rp${totalPendapatan.toLocaleString("id-ID")}` : `-`;
  };

  useEffect(() => {
    fetchDataKaryawan();
  }, [dataKaryawan]);

  return (
    <Box>
      {dataKaryawan.length !== 0 &&
        dataKaryawan.map((item) => {
          const kegiatanTersaring = filterKegiatan(item.kegiatan?.length > 0 ? item.kegiatan : []);
          const totalDurasi = hitungTotalDurasi(kegiatanTersaring);
          const totalPendapatan = hitungTotalPendapatan(totalDurasi, item.rate);

          return (
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
                <Box sx={{ marginX: 3 }}>
                  <DataGrid
                    rows={kegiatanTersaring}
                    columns={columns}
                    autoHeight
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 3,
                        },
                      },
                    }}
                    localeText={{
                      noRowsLabel: "Belum Ada Kegiatan",
                    }}
                    pageSizeOptions={[3]}
                    disableRowSelectionOnClick
                  />
                  <Box sx={{ backgroundColor: "#f5f5f5 ", padding: 1.5, borderRadius: "0 0 10px 10px" }}>
                    <Box display={"flex"} justifyContent={"space-between"}>
                      <Typography color={"#2775EC"}>Total Durasi</Typography>
                      <Typography color={"#2775EC"}>{totalDurasi}</Typography>
                    </Box>
                    <Box display={"flex"} justifyContent={"space-between"}>
                      <Typography fontWeight={"bold"} color={"#2775EC"}>
                        Total Pendapatan
                      </Typography>
                      <Typography fontWeight={"bold"} color={"#2775EC"}>
                        {totalPendapatan}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      {selectedKaryawanId && <ModalForm open={open} onClose={handleClose} karyawanId={selectedKaryawanId} />}
    </Box>
  );
}
