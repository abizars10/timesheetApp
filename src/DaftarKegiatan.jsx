import Header from "./component/header";
import { Box } from "@mui/material";
import Navbar from "./component/navbar";

export default function DaftarKegiatan() {
  return (
    <Box sx={{ backgroundColor: "#F7F8FB", height: "100vh" }}>
      <Header />
      <Navbar />
      <div className="container mt-3">
        <div className="card">
          <div className="card-body">
            <div className="mb-3 d-flex justify-content-between">
              <span>
                <strong>Nama Karyawan:</strong> Timothy Pradana
              </span>
              <span>
                <strong>Rate:</strong> Rp12.000/jam
              </span>
            </div>
            <button className="btn btn-primary mb-3">Tambah Kegiatan</button>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Judul Kegiatan</th>
                  <th scope="col">Nama Proyek</th>
                  <th scope="col">Tanggal Mulai</th>
                  <th scope="col">Tanggal Berakhir</th>
                  <th scope="col">Waktu Mulai</th>
                  <th scope="col">Waktu Berakhir</th>
                  <th scope="col">Durasi</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="8" className="text-center">
                    Belum ada kegiatan
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-3">
              <span>
                <strong>Total Durasi:</strong> -
              </span>
              <span className="float-end">
                <strong>Total Pendapatan:</strong> -
              </span>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
