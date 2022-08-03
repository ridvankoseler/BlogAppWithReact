import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Modal from "./Modal";
import { useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Logo from "../assets/logo.png";
const Navbar = () => {
  const { show, setShow, currentUser } = useContext(AuthContext);
  // console.log(currentUser);
  useEffect(() => {
    const timeout = setTimeout(() => setShow(false), 4000);

    return () => clearTimeout(timeout);
  }, [show]);

  return (
    <nav className='navbar d-flex justify-content-between bg-secondary px-4 '>
      <div className='logo-div'>
        <Link to='/' className='text-light'>
          {" "}
          <img src={Logo} alt='Logo' />
        </Link>
      </div>
      <div className='d-flex align-items-center justify-content-center'>
        <div className='d-flex align-items-center justify-content-center'>
          {currentUser && (
            <h5 className='text-dark d-flex align-items-center m-0'>
              {currentUser.displayName}
            </h5>
          )}
        </div>
        <div className='btnDiv d-flex align-items-center justify-content-center px-3'>
          <button className='border-0 fs-1 bg-transparent d-flex align-items-center'>
            <FaUserCircle
              className='text-primary bg-light rounded-circle '
              onClick={() => setShow(!show)}
            />
          </button>
          {show && <Modal />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
