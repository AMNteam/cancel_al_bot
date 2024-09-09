import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import data from "../language.json";
import { useContext, useState } from "react";
import axios from "axios";
import languageContext from "../context/language/languageContext";

const Signup = () => {
  const navigate = useNavigate();
  const { lang, setPhone, phone } = useContext(languageContext);
  const [responseMessage, setResponseMessage] = useState('');

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!phone || phone.length !== 10 || isNaN(phone)) {
      setResponseMessage("Please enter a valid phone number");
      return;
    }

    const headerList = {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    };

    const bodyContent = JSON.stringify({
      phone: phone,
    });

    try {
      console.log("Sending OTP request...");
      const response = await axios.post(
        'https://www.careplus.gopillz.com/sigup_send_otp',
        bodyContent,
        { headers: headerList }
      );
      console.log("OTP request successful:", response.data);
      setResponseMessage(response.data.message || "OTP sent successfully");

      // Navigate only after a successful response
      navigate("/otp", { state: { from: "signup" } });
    } catch (error) {
      console.error("Error sending OTP:", error.response || error.message);
      setResponseMessage("Failed to send OTP. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />

      <div className='w-[100vw] flex flex-col items-center text-center font-bold bg-bgall h-[calc(100vh-100px)]'>

        {/* Circles */}
        <div className='flex mt-12'>
          <div className='bg-bgcircle w-[12px] h-[12px] rounded-full'></div>
          <div className='bg-gray-300 w-[12px] h-[12px] mx-8 rounded-full'></div>
          <div className='bg-gray-300 w-[12px] h-[12px] rounded-full'></div>
        </div>

        <div className='h-[42px] mt-10'>
          <div className='font-[600] text-[24px] leading-[42px]'>{data[lang]["auth"][0]}</div>
        </div>

        <div className='flex justify-evenly'>
          <div className='mt-8'>
            <div className='text-[17px]'>Enter your Mobile number</div>

            <form onSubmit={handleSignup}>
              <input
                type="text"
                required
                className="flex justify-center text-center px-8 py-1 rounded-lg bg-bginput my-4 focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                placeholder="xxxxx-xxxxx"
                value={phone}
                onChange={handlePhoneChange}
              />
              <button
                type='submit'
                className='bg-bluebtn rounded-lg px-8 py-2 my-4 text-white font-[100]'
              >
                Proceed
              </button>
            </form>

            {responseMessage && <div className='text-red-500'>{responseMessage}</div>}
            <div className='text-[17px]'>or login <Link to="/login">HERE</Link></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
