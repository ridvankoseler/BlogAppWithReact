import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Modal from "./Modal";
const Navbar = () => {
  return (
    <nav className='navbar d-flex justify-content-between bg-secondary px-3 text-center'>
      <div>
        <Link to='/' className='text-light'>
          LOGO
        </Link>
      </div>
      <div className="btnDiv me-2">
        <button className='border-0 fs-3 bg-transparent p-1'>
          <FaUserCircle className=' bg-light rounded-circle' />
        </button>
        <Modal />
      </div>
    </nav>
  );
};
export default Navbar;
