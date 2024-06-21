import { Link } from "react-router-dom";

export default function DaftarKegiatan() {
  return (
    <>
      <nav className="navbar navbar-expand-lg shadow-sm ps-2">
        <div className="container-fluid">
          <p className="navbar-brand mb-0 fw-bold lh-1">
            <span className="fs-6">Timesheet</span> <br /> Management
          </p>
        </div>
      </nav>
      <div className="container mt-3">
        <h3>HH Timesheet</h3>
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <Link className="nav-link active" to="/">
              Daftar Kegiatan
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/pengaturan">
              Pengaturan
            </Link>
          </li>
        </ul>
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
    </>
  );
}
