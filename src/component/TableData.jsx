/* eslint-disable react/prop-types */
import { Box, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TableData({ karyawanId, filteredData, rate }) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/kegiatan");
      setData(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const processData = (data) => {
    return data
      .filter((item) => item.id_karyawan === karyawanId)
      .map((item) => ({
        id: item.id,
        judul: item.judul,
        proyek: item.proyek,
        tgl_mulai: item.tgl_mulai,
        tgl_berakhir: item.tgl_berakhir,
        waktu_mulai: item.waktu_mulai,
        waktu_berakhir: item.waktu_berakhir,
        durasi: item.durasi,
        id_karyawan: item.id_karyawan,
      }));
  };

  const calculateTotalDurasi = (data) => {
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

  const calculateTotalPendapatan = (totalDurasi, rate) => {
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
    return totalJam !== 0 ? "Rp" + totalJam * rate : "-";
  };

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
          <IconButton size="small" sx={{ color: "#ff8da1" }} onClick={() => handleEdit(params.row.id)}>
            <EditIcon fontSize={"small"} />
          </IconButton>
          <IconButton size="small" sx={{ color: "#ff8da1" }} onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon fontSize={"small"} />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleEdit = (id) => {
    console.log(id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/kegiatan/${id}`);
      if (response.status === 200) {
        setData((prev) => prev.filter((data) => data.id !== id));
      }
    } catch (err) {
      console.error("Error saat menghapus data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredKegiatan = processData(data);
  const totalDurasi = calculateTotalDurasi(filteredKegiatan);
  const totalPendapatan = calculateTotalPendapatan(totalDurasi, rate);

  return (
    <Box sx={{ marginX: 3 }}>
      <DataGrid
        rows={filteredData(filteredKegiatan)}
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
  );
}
