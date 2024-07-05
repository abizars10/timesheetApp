import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

const columns = [
  { field: "name", headerName: "Judul Kegiatan", width: 300 },
  {
    field: "position",
    headerName: "Nama Proyek",
    width: 200,
    editable: true,
  },
  {
    field: "tgl_mulai",
    headerName: "Tanggal Mulai",
    width: 125,
    editable: true,
  },
  {
    field: "tgl_berakhir",
    headerName: "Tanggal Berakhir",
    width: 125,
    editable: true,
  },
  {
    field: "waktu_mulai",
    headerName: "Waktu Mulai",
    width: 125,
    editable: true,
  },
  {
    field: "waktu_berakhir",
    headerName: "Waktu Berakhir",
    width: 125,
    editable: true,
  },
  {
    field: "durasi",
    headerName: "Durasi",
    width: 150,
    editable: true,
  },
  {
    headerName: "Aksi",
    width: 100,
    editable: true,
  },
];

export default function TableData() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/karyawan");
      setData(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const transformData = (data) => {
    return data.map((item) => ({
      id: item._id,
      name: item.name,
      proyek: item.proyek,
      tgl_mulai: item.tgl_mulai,
      tgl_berakhir: item.tgl_berakhir,
      waktu_mulai: item.waktu_mulai,
      waktu_berakhir: item.waktu_berakhir,
      durasi: item.durasi,
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box sx={{ marginX: 3 }}>
        <DataGrid
          rows={transformData(data)}
          columns={columns}
          autoHeight
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 3,
              },
            },
          }}
          pageSizeOptions={[3]}
          //   checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}
