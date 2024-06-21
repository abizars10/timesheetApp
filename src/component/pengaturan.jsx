export default function Pengaturan() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
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
  );
}
