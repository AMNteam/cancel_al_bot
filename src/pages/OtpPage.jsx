import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios"; // Import axios
import languageContext from "../context/language/languageContext";
import data from "../language.json";

function OtpVerify() {
    const { lang ,phone} = useContext(languageContext);
    const [Otp, setotp] = useState(new Array(6).fill("")); // For OTP input
    const [counter, setCounter] = useState(60); // Timer state
    const navigate = useNavigate();
    const location = useLocation();
    const { from } = location.state || {};
    
    // Handle OTP change in inputs
    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;
        setotp([...Otp.map((d, idx) => (idx === index ? element.value : d))]);
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    // Timer for resending OTP
    useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    // API Request for OTP verification
    const verifyOtp = async () => {
        const otpValue = Otp.join(""); // Combine OTP array to a string

        try {
            let headersList = {
                "Accept": "*/*",
                "Content-Type": "application/json"
            };

            let bodyContent = JSON.stringify({
                "phone": phone,
                "otp": otpValue
            });

            let reqOptions = {
                url: "https://www.careplus.gopillz.com/login_al_chatbot", // API endpoint
                method: "POST",
                headers: headersList,
                data: bodyContent,
            };

            let response = await axios.request(reqOptions); // Log API response for debugging

            // Handle success and redirect
            if (response.data.access_token) {
                localStorage.setItem('token',response.data.access_token)
                navigate(from === "login" ? '/ask' : '/account');
            } else {
                alert("OTP verification failed");
            }

        } catch (error) {
            console.error("Error during OTP verification:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className='w-[100vw] flex flex-col items-center text-center font-bold bg-bgall h-[calc(100vh-100px)]'>
                <div className="forgot_head mt-10 text-2xl">{data[lang]["auth"][2]}</div>
                <div className="forgot_cont">
                    Enter the code sent to your registered Phone number
                </div>
                <div className="boxes_otp w-4/12">
                    {Otp.map((data, index) => {
                        return (
                            <input
                                type="text"
                                maxLength="1"
                                className="input_otp"
                                key={index}
                                value={data}
                                onChange={(e) => handleChange(e.target, index)}
                                onFocus={(e) => e.target.select()}
                                required
                            />
                        );
                    })}
                </div>
                <div className="flex flex-col justify-center items-center">
                    {/* Verify OTP Button */}
                    <button 
                        onClick={verifyOtp} 
                        className="forgot_btn bg-bluebtn rounded-lg w-[200px] py-2 my-4 text-white font-[100]"
                    >
                        Verify OTP
                    </button>
                </div>
                <div className="timer">
                    <div className="written">Resend OTP in 00 : {counter}</div>
                    <a href="/" className="forgot_resend">
                        Resend OTP ?
                    </a>
                </div>
            </div>
        </div>
    );
}

export default OtpVerify;
