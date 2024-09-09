import { FaArrowLeft } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RiLogoutCircleRLine } from "react-icons/ri";
import languageContext from "../context/language/languageContext";
import { useContext } from "react";
const Navbar = () => {
    const {setChats}= useContext(languageContext)
    const navigate = useNavigate();
    const location = useLocation();
    const url = location.state?.url || '/'; // Retrieve URL from state with fallback
    const handleClick=()=>{
        setChats(prevData =>[{heading:'Untitled doc',desc:'Ask anything',id:'0'},...prevData])
        navigate("/ask/0")
    }
    const logout = () => {
        localStorage.removeItem('token');
        navigate("/");
    }

    return (
        <div className="bg-bgcolor w-full h-[80px] flex items-center justify-between">
            <div className='flex'>
            <Link to={url}>
                <div className='w-[40px] h-[40px] bg-white rounded-full flex justify-center items-center ml-5'>
                    <FaArrowLeft />
                </div>
            </Link>
            {location.pathname.startsWith("/ask") && (
                    <div className='bg-slate-200 ml-2 rounded-lg my-auto px-2 py-1 cursor-pointer' onClick={handleClick}>New Chat</div>
                )}
            </div>
            <div className='w-[40px] h-[40px] bg-white rounded-full flex justify-center items-center mr-5' onClick={logout}>
                <RiLogoutCircleRLine size='1.2rem'/>
            </div>
        </div>
    );
}

export default Navbar;
