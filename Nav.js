import { useContext, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";
import logo from "../img/logo.png"; // Add your image in src/img/logo.png

function Nav() {
  const { user } = useContext(ThemeContext);
  const [zoom, setZoom] = useState(false); // Modal state

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-black shadow-sm">
        <div className="container-fluid px-4">
          {/* Logo with zoom trigger */}
          <div
            className="navbar-brand d-flex align-items-center"
            onClick={() => setZoom(true)}
            style={{ cursor: "zoom-in" }}
          >
            <img
              src={logo}
              alt="Logo"
              width="60"
              height="60"
              className="rounded-circle me-3 border border-light"
              style={{ objectFit: "cover" }}
            />
            <span className="fw-bold fs-4 text-white">BookVault</span>
          </div>

          {/* Navbar toggler for mobile */}
          <button
            className="navbar-toggler bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Links */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/home" className="nav-link text-white">🏠Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/product" className="nav-link text-white">📦 Product</Link>
              </li>
              {user?.role === "ADMIN" && (
                <li className="nav-item">
                  <Link to="/bookadd" className="nav-link text-white">➕ Book Add</Link>
                </li>
              )}
              {user === null ? (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link text-white">🔐Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link text-white">📝Register</Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link to="/logout" className="nav-link text-white">↩️Logout</Link>
                </li>
              )}
            </ul>

            {user && (
              <span className="navbar-text ms-auto text-info fw-semibold fs-6">
                Hello, {user.username}
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Outlet for routing */}
      <Outlet />

      {/* Zoom Modal */}
      {zoom && (
        <div className="logo-modal" onClick={() => setZoom(false)}>
          <img src={logo} alt="Zoomed Logo" className="zoomed-logo" />
        </div>
      )}
    </>
  );
}

export default Nav;
