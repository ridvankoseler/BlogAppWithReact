import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Modal from "./Modal";
import { useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Logo from "../assets/blog.png";
const Navbar = () => {
  const { show, setShow, currentUser } = useContext(AuthContext);
  // console.log(currentUser);
  useEffect(() => {
    const timeout = setTimeout(() => setShow(false), 4000);

    return () => clearTimeout(timeout);
  }, [show]);

  return (
    <nav className='navbar d-flex justify-content-between bg-primary px-3'>
      <div className='logo-div'>
        <Link to='/' className='text-light'>
          {" "}
          <img src={Logo} alt='Logo' />
        </Link>
      </div>
      <div className=' d-flex align-items-center justify-content-center gap-2'>
        {currentUser && (
          <h5 className='text-light d-flex align-items-center justify-content-center'>
            {currentUser.displayName}
          </h5>
        )}
        <div className='btnDiv me-2 text-center d-flex align-items-center justify-content-center'>
          <button className='border-0 fs-3 bg-transparent pb-1'>
            <FaUserCircle
              className='text-danger bg-light rounded-circle '
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
