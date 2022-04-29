import { React } from "react";
import SecureContent from "../components/secure-content";
import { useProfile } from "../context/profile-context";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { profile, signout } = useProfile();
  const navigate = useNavigate();
  const renderSignout = () => {
    return (
      <button
        onClick={async () => {
          try {
            await signout();
          } catch (e) {}
          navigate("/signin");
          window.location.reload();
        }}
        className="btn btn-outline-danger rounded-pill"
      >
        Logout
      </button>
    );
  };
  const renderSignin = () => {
    return (
      <a href="/signin">
        <button className="btn btn-outline-success rounded-pill">Signin</button>
      </a>
    );
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/home">
          <button className="btn btn-outline-success" type="submit">
            <span className="fs-4">
              <img
                className="me-2"
                src="https://img.icons8.com/office/80/000000/carrot.png"
                width="40"
                alt=""
              />
              Recipe Reviewer
            </span>
          </button>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/search">
                Search
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/profile">
                Profile
              </a>
            </li>
          </ul>
          <div className="me-5">
            Hello
            <SecureContent>{profile && ` ${profile.firstName}`}</SecureContent>!
          </div>
          <SecureContent>{profile && renderSignout()}</SecureContent>
          {!profile && renderSignin()}
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
