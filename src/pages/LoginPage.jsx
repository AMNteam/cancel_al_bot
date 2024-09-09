import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';
import data from "../language.json";
import languageContext from "../context/language/languageContext";
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const { lang, phone, setPhone } = useContext(languageContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      alert('Please enter a valid number');
      return;
    }

    const headerList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
    };

    try {
      const response = await axios.post(
        "https://www.careplus.gopillz.com/send_otp_al_chatbot",
        JSON.stringify({ phone }),
        { headers: headerList }
      );
      // console.log(response.data.msg);
      navigate("/otp", { state: { from: "login" } });
    } catch (error) {
      console.error("OTP cannot be sent, please try again later: ", error);
      alert("Cannot Login");
    }
  };

  return (
    <div>
      <Navbar />

      <div className='w-full flex flex-col items-center text-center font-bold bg-bgall h-screen'>
        {/* Circles */}
        <div className='flex mt-12'>
          <div className='bg-bgcircle w-[12px] h-[12px] rounded-full'></div>
          <div className='bg-gray-300 w-[12px] h-[12px] mx-8 rounded-full'></div>
          <div className='bg-gray-300 w-[12px] h-[12px] rounded-full'></div>
        </div>

        <div className='mt-10'>
          <div className='font-[600] text-[24px] leading-[42px]'>{data[lang]["auth"][1]}</div>
        </div>

        <div className='flex justify-evenly mt-8'>
          <div>
            <div className='text-[17px]'>Enter your Mobile number</div>

            <form onSubmit={handleLogin}>
              <input
                type="text"
                required
                className="flex justify-center text-center px-8 py-1 rounded-lg bg-bginput my-4 focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                placeholder="xxxxx-xxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <button
                type='submit'
                className='bg-bluebtn rounded-lg px-8 py-2 my-4 text-white font-[100]'
              >
                Proceed
              </button>
            </form>
            <div className='text-[17px]'>or signup <Link to="/signup">HERE</Link></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
