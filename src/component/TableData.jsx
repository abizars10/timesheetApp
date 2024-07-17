/* eslint-disable react/prop-types */
import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TableData({ karyawanId, filteredData }) {
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
        console.log(`ID yang dihapus: ${id}`);
      }
    } catch (err) {
      console.error("Error saat menghapus data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ marginX: 3 }}>
      <DataGrid
        rows={filteredData(processData(data))}
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
    </Box>
  );
}
