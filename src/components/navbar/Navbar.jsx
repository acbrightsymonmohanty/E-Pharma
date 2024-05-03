import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // State to manage menu visibility
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('users'));
    const cartItems = useSelector((state) => state.cart);

    const logout = () => {
        localStorage.clear('users');
        navigate("/login")
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const navList = (
        <ul className={`flex flex-col lg:flex-row lg:space-x-6 text-white font-medium text-md px-5 lg:flex ${isOpen ? 'block' : 'hidden'}`}>
            {/* Home */}
            <li>
                <Link to={'/'} onClick={toggleMenu}>Home</Link>
            </li>
            {/* All Product */}
            <li>
                <Link to={'/allproduct'} onClick={toggleMenu}>All Product</Link>
            </li>
            {/* Signup */}
            {!user && (
                <li>
                    <Link to={'/signup'} onClick={toggleMenu}>Signup</Link>
                </li>
            )}
            {/* Login */}
            {!user && (
                <li>
                    <Link to={'/login'} onClick={toggleMenu}>Login</Link>
                </li>
            )}
            {/* User */}
            {user?.role === "user" && (
                <li>
                    <Link to={'/user-dashboard'} onClick={toggleMenu}>Hello {user.name}</Link>
                </li>
            )}
            {/* Admin */}
            {user?.role === "admin" && (
                <li>
                    <Link to={'/admin-dashboard'} onClick={toggleMenu}><b>ADMIN {user.name}</b></Link>
                </li>
            )}
            {/* Logout */}
            {user && (
                <li className="cursor-pointer" onClick={logout}>
                    Logout
                </li>
            )}
            {/* Cart */}
            <li>
                <Link to={'/cart'} onClick={toggleMenu}>
                    Cart({cartItems.length})
                </Link>
            </li>
        </ul>
    );

    return (
        <nav className="bg-pink-600 sticky top-0">
            <div className="lg:flex lg:justify-between items-center py-3 lg:px-3">
                <div className="left py-3 lg:py-0">
                    <Link to={'/'}>
                        <h2 className="font-bold text-white text-2xl text-center">E-Pharma</h2>
                    </Link>
                </div>
                <div className="lg:hidden">
                    <button onClick={toggleMenu} className="block text-white focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
                <div className="right flex justify-center mb-4 lg:mb-0">
                    {navList}
                </div>
                <SearchBar />
            </div>
        </nav>
    );
}

export default Navbar;
