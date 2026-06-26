import '../styles/NavBar.css'
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();

    const HandleOnClickSignup = () => {
        navigate('/signup');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary NavBar_main">
                <div className="container-fluid">
                    <a className="navbar-brand" style={{ "margin-left": "20px" }} href="#">Canteen</a>
                    <div className="collapse navbar-collapse navigations" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item nav_item_space">
                                <a className="nav-link" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item nav_item_space">
                                <a className="nav-link" href="#">Menu</a>
                            </li>
                            <li className="nav-item nav_item_space">
                                <a className="nav-link" href="#">Orders</a>
                            </li>
                            <li className="nav-item nav_item_space">
                                <a className="nav-link" href="#">Profile</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="container-fluid justify-content-end">
                    <div className="collapse navbar-collapse navigations" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link cart-icon-navbar" href="#"><IoCartOutline /></a>
                            </li>
                            <li className="nav-item signup-button">
                                <button className="signup-btn" onClick={HandleOnClickSignup}>Signup</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar;