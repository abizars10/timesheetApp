export default function Header() {
  return (
    <header>
      <p className="p-3 pt-2 fs-2">HH Timesheet</p>
      <ul className="nav nav-underline shadow-sm ps-5 ">
        <li className="nav-item">
          <a className="nav-link" href="#">
            Daftar Kegiatan
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Pengaturan
          </a>
        </li>
      </ul>
    </header>
  );
}
