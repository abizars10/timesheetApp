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
            <Link className="nav-link " to="/">
              Daftar Kegiatan
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/pengaturan">
              Pengaturan
            </Link>
          </li>
        </ul>
        <div className="d-flex justify-content-center align-items-center ">
          <div className="card p-4" style={{ width: "25rem" }}>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  Nama Karyawan
                </label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Nama Karyawan" />

                <label htmlFor="exampleFormControlInput2" className="form-label mt-3">
                  Rate
                </label>
                <div className="input-group">
                  <input type="text" className="form-control" id="exampleFormControlInput2" placeholder="Nominal Rupiah" />
                  <span className="input-group-text">/Jam</span>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button className="btn btn-secondary" type="button">
                  Batalkan
                </button>
                <button className="btn btn-primary" type="button">
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
